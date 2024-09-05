import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";

interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void;
}

function RangePicker({ startDate, endDate, onChange }: RangePickerProps) {
  const today = new Date();

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) return;

    const { from, to } = dateRange;

    // 중복된 날짜인 경우
    if (from && to && isSameDay(from, to)) return;

    console.log("DATERANGE", dateRange);

    const formattedDateRange = {
      from: from ? format(from, "yyyy-MM-dd") : undefined,
      to: to ? format(to, "yyyy-MM-dd") : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    };

    onChange(formattedDateRange);
  };

  const selected = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  };

  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        disabled={{
          before: addDays(new Date(), 1),
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }

  .rdp-caption_label {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-month_grid {
    width: 100%;
  }

  .rdp-weekdays {
    height: 45px;
    font-size: 12px;
    color: ${colors.gray400};
    font-weight: bold;
  }

  .rdp-week {
    height: 45px;
  }

  .rdp-day .rdp-day_button {
    position: relative;
    width: 100%;
    height: 45px;
  }

  .rdp-day .rdp-day_button[disabled] {
    color: ${colors.gray200};
  }

  .rdp-selected {
    background-color: ${colors.blue100};
    box-sizing: border-box;
  }

  .rdp-range_start {
    color: white;
    background-color: ${colors.blue};
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  .rdp-range_end {
    color: white;
    background-color: ${colors.blue};
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  /* .rdp-range_start::after,
  .rdp-range_end::after {
    z-index: -1;
    display: block;
    width: calc(100% - 1px);
    height: 45px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.blue};
    content: "";
  } */
`;

export default RangePicker;
