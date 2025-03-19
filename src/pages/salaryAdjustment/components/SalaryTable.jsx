import React from "react";
import styled from "styled-components";
import { rolesPermissions } from "../../../shared/config/rolesPermissions";
import StatusCell from "./StatusCell";
import ManagerSelectBox from "./ManagerSelectBox";

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  margin-top: 45px;
  margin-bottom: 138px;
  text-align: center;
  font-size: var(--font-size-title-small);
  border-spacing: 10px;
  border-top: 2px solid var(--background-color);
  border-bottom: 2px solid var(--background-color);

  thead {
    display: table;
    table-layout: fixed;
    width: 100%;
    font-weight: 700;

    border-bottom: 2px solid var(--background-color);

    &::after {
      content: "";
      display: block;
      height: 10px;
    }

    tr {
      border-bottom: 2px solid var(--background-color);

      th {
        color: var(--text-secondary);
      }
    }
  }

  tbody {
    display: block;
    max-height: 480px;
    overflow-y: scroll;

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;

      //내역 확인 hover 속성
      cursor: pointer;

      &:hover {
        background-color: var(--background-color-3);
      }

      td {
        color: var(--text-primary);

        &:nth-last-child(2) {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:last-child {
          padding-right: 14px;
        }
      }
    }
  }

  th > div {
    width: 116px;
  }

  th > div > button {
    justify-content: space-around;
  }

  th {
    &:last-child {
      padding: 0 24px;
    }
  }

  th,
  td {
    width: 20%;
    padding: 24px;

    &:nth-last-child(2) {
      width: 40%;
    }
  }
`;

const SalaryTable = ({
  position,
  statusFilter,
  setStatusFilter,
  requests,
  filteredRequests,
  handleRowClick,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          {rolesPermissions[position].canConfirm ? (
            <>
              <th>신청자</th>
              <th>신청 날짜</th>
              <th>정정 대상</th>
              <th>정정 사유</th>
              <th>
                <ManagerSelectBox
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
              </th>
            </>
          ) : (
            <>
              <th>정정 대상</th>
              <th>정정 유형</th>
              <th>정정 사유</th>
              <th>처리 상태</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {rolesPermissions[position].canConfirm ? (
          filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="5">신청된 정정 내역이 없습니다.</td>
            </tr>
          ) : (
            filteredRequests.map((request, index) => {
              const date = new Date(request.date);
              const formattedDate = `${date.getFullYear()} / ${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}`;

              return (
                <tr key={index} onClick={() => handleRowClick(request)}>
                  <td>{request.name}</td>
                  <td>{formattedDate}</td>
                  <td>{request.type}</td>
                  <td title={request.reason}>{request.reason}</td>
                  <td>
                    <StatusCell $status={request.status}>
                      {request.status}
                    </StatusCell>
                  </td>
                </tr>
              );
            })
          )
        ) : requests.length === 0 ? (
          <tr>
            <td colSpan="4">신청된 정정 내역이 없습니다.</td>
          </tr>
        ) : (
          requests.map((request, index) => {
            const date = new Date(request.date);
            const formattedDate = `${date.getFullYear()} / ${(
              date.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`;

            return (
              <tr key={index} onClick={() => handleRowClick(request)}>
                <td>{formattedDate}</td>
                <td>{request.type}</td>
                <td title={request.reason}>{request.reason}</td>
                <td>
                  <StatusCell $status={request.status}>
                    {request.status}
                  </StatusCell>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default SalaryTable;
