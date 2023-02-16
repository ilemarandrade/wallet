import { ButtonBase, Tooltip } from "@material-ui/core";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTranslation } from "react-i18next";

const months = (t) => [
  t("abbreviated_months.jan"),
  t("abbreviated_months.feb"),
  t("abbreviated_months.mar"),
  t("abbreviated_months.apr"),
  t("abbreviated_months.may"),
  t("abbreviated_months.jun"),
  t("abbreviated_months.jul"),
  t("abbreviated_months.aug"),
  t("abbreviated_months.sep"),
  t("abbreviated_months.oct"),
  t("abbreviated_months.nov"),
  t("abbreviated_months.dec"),
];

const RootStyles = styled.div`
  padding-bottom: 4rem;
  min-height: 90px;
  max-height: 600px;
  overflow: auto;
`;

const ButtonStyles = styled(ButtonBase)`
  & * {
    font-size: 18px;
    box-sizing: border-box;
    color: #44474b;
  }
  width: 100%;
  border-bottom: 2px solid #c0ced6;
  padding: 1rem 0rem;
`;

const DateStyles = styled.div`
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  & * {
    text-align: center;
    line-height: 14px;
  }
  & .day {
    font-weight: 600;
  }
  & .month,
  & .year {
    font-size: 11px;
  }
`;

const BorderRight = styled.span`
  position: absolute;
  border-right: 0.5px solid #c0ced6;
  width: 100%;
  height: 90%;
`;

const Arrow = styled.span`
  position: absolute;
  right: 10px;
  top: 35%;
`;

const DescriptionStyles = styled.div`
  ${({ theme }) => `
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 0rem 1rem;
    font-weight: 500;
    position: relative;
    & * {
      text-align: left;
      line-height: 26px;
    }
    & .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 92%;
    }
    & .credit {
      color: ${theme.palette.primary.main};
    }
    & .debit {
      color: ${theme.palette.error.main};
    }
  `}
`;
const MovementsCell = ({ data, movementSelected }) => {
  const { t } = useTranslation();
  const abbreviatedMonths = months(t);
  return (
    <RootStyles>
      {data.map((movement) => {
        const createdAtDate = moment.unix(movement.date);
        return (
          <ButtonStyles
            onClick={() => movementSelected(movement)}
            fullWidth
            key={movement._id}
          >
            <DateStyles>
              <div className="day">{createdAtDate.date()}</div>
              <div className="month">
                {abbreviatedMonths[createdAtDate.month()]}
              </div>
              <div className="year">{createdAtDate.year()}</div>
              <BorderRight />
            </DateStyles>
            <DescriptionStyles>
              <Tooltip
                title={movement.concept}
                arial-label="Error"
                leaveTouchDelay={500}
                enterTouchDelay={0}
                placement="bottom-start"
              >
                <div className="name">{movement.concept}</div>
              </Tooltip>

              <div className={movement.type}>{`$${movement.amount}`}</div>
              <Arrow>
                <ChevronRightIcon />
              </Arrow>
            </DescriptionStyles>
          </ButtonStyles>
        );
      })}
    </RootStyles>
  );
};
export default MovementsCell;
