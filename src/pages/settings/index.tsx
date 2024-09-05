import ListRow from "@/components/shared/ListRow";
import { Link } from "react-router-dom";

function SettingsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts
                  title="찜하기 설정"
                  subTitle="찜한 호텔 순서 변경"
                />
              }
              withArrow
            />
          </Link>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="예약목록" subTitle="예약목록 보러가기" />
              }
              withArrow
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SettingsPage;
