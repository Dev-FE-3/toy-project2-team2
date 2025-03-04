import styled from "styled-components";
import logo from "./../../assets/images/logo.svg";
import DefaultProfile from "./../../assets/images/defaultImg.svg";
import LogOutButton from "./LogOutButton";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const HeaderWrap = styled.div`
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
`;

const HeaderInner = styled.header`
  width: 1440px;
  margin: 0 auto;
  padding: 18px 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
`;

const Logo = styled.img`
  width: 112px;
  height: 100%;
`;

const Wrap = styled.div`
  display: flex;
  gap: 60px;
`;

const User = styled.span`
  display: inline-block;
  font-size: var(--font-size-primary);
  font-weight: 400;
  color: var(--text-primary);
  line-height: 38px;
`;

const ProfileUpload = styled.label`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
`;

const DefaultImg = styled.img``;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; // 비율 맞춰 채우기!
`;

const ProfileInput = styled.input`
  display: none;
`;

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Header = () => {
  const user = auth.currentUser;
  const [profile, setProfile] = useState(user?.photoURL);
  const [userInfo, setUserInfo] = useState({
    name: "anonymous",
    position: "메이트",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const profileUrl = await getDownloadURL(
          ref(storage, `profiles/${user.uid}`)
        );
        setProfile(profileUrl);
      } catch (error) {
        setProfile(null); // 기본 아이콘으로 설정
      }
    };

    const fetchUserInfo = async () => {
      if (!user) return;
      try {
        // Firestore에서 user.uid에 해당하는 사용자 정보 가져오기
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo({
            name: docSnap.data().name || "anonymous", // 이름이 없다면 "anonymous"
            position: docSnap.data().position || "메이트", // 직급이 없다면 "메이트"
          });
        } else {
          setUserInfo({ name: "anonymous", position: "메이트" });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo({ name: "anonymous", position: "메이트" });
      }
    };

    fetchProfile();
    fetchUserInfo();
  }, [user]); // user가 변경될 때마다 실행

  const onProfileChange = async (e) => {
    const { files } = e.target;
    if (!user || !files?.length) return; // 로그인된 사용자도 없고, 선택한 파일도 없으면 함수 종료

    const file = files[0];
    const locationRef = ref(storage, `profiles/${user.uid}`);
    try {
      const result = await uploadBytes(locationRef, file);
      const profileUrl = await getDownloadURL(result.ref);
      setProfile(profileUrl);
      await updateProfile(user, { photoURL: profileUrl });
    } catch (error) {
      setProfile(null); // 기본 아이콘으로 변경
      // 사용자에게 에러 메시지 표시
      setError("프로필 사진 업로드에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <HeaderWrap>
      <HeaderInner>
        <Link to="/">
          <Logo src={logo} alt="Sweet Ten" />
        </Link>
        <Wrap>
          <Nav />
          <UserWrap>
            <User>{`${userInfo.name} ・ ${userInfo.position}`}</User>
            <ProfileUpload htmlFor="profile">
              {profile ? (
                <ProfileImg src={profile} />
              ) : (
                <DefaultImg src={DefaultProfile} alt="default profile" />
              )}
            </ProfileUpload>
            <ProfileInput
              onChange={onProfileChange}
              id="profile"
              type="file"
              accept="image/*"
            />
          </UserWrap>
          <LogOutButton />
        </Wrap>
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;
