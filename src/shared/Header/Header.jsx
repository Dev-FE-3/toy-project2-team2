import styled from "styled-components";
import logo from "/images/logo.svg";
import DefaultProfile from "/images/defaultImg.svg";
import LogOutButton from "./LogOutButton";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { selectUserInfo, setUserInfo } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

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
  object-fit: cover;
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
  const { name, position } = useSelector(selectUserInfo);

  const onProfileChange = async (e) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profiles/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const profileUrl = await getDownloadURL(result.ref);
      setProfile(profileUrl);
      await updateProfile(user, {
        photoURL: profileUrl,
      });
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
            <User>
              {name} ・ {position}
            </User>
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
