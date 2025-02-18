// utils/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import buddhistEra from "dayjs/plugin/buddhistEra"; // ใช้ปี พ.ศ.
import "dayjs/locale/th"; // นำเข้า locale ภาษาไทย

dayjs.extend(utc);
dayjs.extend(buddhistEra);
dayjs.locale("th"); // ตั้งค่าเป็นภาษาไทย

export default dayjs;
