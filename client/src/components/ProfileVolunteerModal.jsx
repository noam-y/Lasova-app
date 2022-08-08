import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

import { ReactComponent as Table } from "../assets/imgs/icons/profile/table.svg";
import { ReactComponent as Notify } from "../assets/imgs/icons/profile/notify.svg";
import { ReactComponent as Folder } from "../assets/imgs/icons/profile/folder.svg";
import { ReactComponent as Avatar } from "../assets/imgs/icons/profile/avatar.svg";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";

const ProfileVolunteerModal = ({ volunteer, open, setOpen }) => {
  const [isOption2, setIsOption2] = useState(false);
  const [isOption3, setIsOption3] = useState(false);
  const [editVolunteer, setVolunteer] = useState(volunteer);
  const [isEdit, setIsEdit] = useState({});

  const onChange = (value) => {
    const date = moment(value).format("DD/MM/YYYY");
    console.log(date);
  };

  console.log(volunteer);

  const handleChange = (e) => {
    setVolunteer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "groupName") {
      switch (e.target.value) {
        case "עצמאי":
          setIsOption2(false);
          setIsOption3(false);
          break;
        case "סטודנט":
          setIsOption2(true);
          setIsOption3(false);
          break;
        case "שלצ":
          setIsOption2(false);
          setIsOption3(true);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("..will submit:", editVolunteer);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className="profile_modal">
        <div className="profile_title">
          <h1 className="title">פרופיל מתנדב</h1>
        </div>
        <div className="profile_modal_content">
          <div className="profile_modal_content_top">
            <div className="profile_pic">
              <span className="profile_pic_img">
                <Avatar />
              </span>
            </div>
            <div className="profile_details">
              <div className="profile_details_packages">
                <div className="package">
                  <h4 className="profile_details_title">שם מלא: </h4>
                  <p className="profile_details_content">
                    {`${volunteer.firstName} ${volunteer.lastName}`}
                  </p>
                  <br />
                  <h4 className="profile_details_title">מייל: </h4>
                  <p className="profile_details_content">{volunteer.email}</p>
                </div>
                <div className="package">
                  <h4 className="profile_details_title">טלפון: </h4>
                  <p className="profile_details_content">{volunteer.phone}</p>
                  <br />
                  <h4 className="profile_details_title">ת.ז: </h4>
                  <p className="profile_details_content">{volunteer.taz}</p>
                </div>
                <div className="package">
                  <h4 className="profile_details_title">עיר מגורים: </h4>
                  <p className="profile_details_content">{volunteer.city}</p>
                  <br />
                  <h4 className="profile_details_title">לשון פנייה: </h4>
                  <p className="profile_details_content">{volunteer.gender}</p>
                </div>
                {/* <h4 className="profile_details_title">תאריך לידה: </h4>
                <p className="profile_details_content">{volunteer.birth}</p> */}
              </div>
            </div>
          </div>
          <div className="profile_modal_content_bottom">
            <div className="profile_modal_content_right">
              <span className="volunteering_details">
                <label className="profile_modal_label">בחר מסגרת התנדבות</label>
                <select
                  name="volunteeringProgram"
                  className="profile_modal_input"
                  onChange={handleChange}
                >
                  <option value="מסעדת לשובע תא">מסעדת לשובע ת"א</option>
                </select>
                <label className="profile_modal_label">בחר מסגרת מפנה</label>
                <select
                  name="groupName"
                  className="profile_modal_input"
                  onChange={handleChange}
                >
                  <option id="1" value="עצמאי">
                    עצמאי
                  </option>
                  <option id="2" value="סטודנט">
                    סטודנט
                  </option>
                  <option id="3" value="שלצ">
                    של"צ
                  </option>
                </select>
                {isOption2 && (
                  <>
                    <div className="selection_group" onChange={handleChange}>
                      <span className="selection_group_btns">
                        <input type="checkbox" value="נקז" name="student" />
                        <label htmlFor="nakaz">נק"ז</label>
                      </span>
                      <span className="selection_group_btns">
                        <input type="checkbox" value="מלגה" name="student" />
                        <label htmlFor="milga">מלגה</label>
                      </span>
                    </div>
                    <label className="profile_modal_label">שם המלגה</label>
                    <input
                      className="profile_modal_input"
                      type="text"
                      name="milgaName"
                      required
                      onChange={handleChange}
                    />
                  </>
                )}
                {isOption3 && (
                  <>
                    <label className="profile_modal_label">שם קצינת מבחן</label>
                    <input
                      className="profile_modal_input"
                      type="text"
                      name="kzinaName"
                      required
                      onChange={handleChange}
                    />
                    <label className="profile_modal_label">
                      טלפון קצינת מבחן
                    </label>
                    <input
                      className="profile_modal_input"
                      type="text"
                      name="kzinaPhone"
                      required
                      onChange={handleChange}
                    />
                  </>
                )}
              </span>
            </div>
            <div className="profile_modal_content_center">
              {/* <label className="profile_modal_label">לשון פניה</label>
            <div className="selection_group" onChange={handleChange}>
              <span className="selection_group_btns">
                <input type="radio" value="male" name="gender" />
                <label htmlFor="male">זכר</label>
              </span>
              <span className="selection_group_btns">
                <input type="radio" value="female" name="gender" />
                <label htmlFor="female">נקבה</label>
              </span>
              <span className="selection_group_btns">
                <input type="radio" value="other" name="gender" />
                <label htmlFor="other">אחר</label>
              </span>
            </div> */}
              <span className="attached_files">
                <label className="profile_modal_label">מסמכים מצורפים</label>
                <button
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/drive/u/0/?ogsrc=32&tab=mo"
                    )
                  }
                >
                  <Folder />
                </button>
              </span>
              <span className="selection_group_package">
                <label className="profile_modal_label">רישיון נהיגה</label>
                <div className="selection_group" onChange={handleChange}>
                  <span className="selection_group_btns">
                    <input type="radio" value="yes" name="driving_license" />
                    <label htmlFor="yes">יש</label>
                  </span>
                  <span className="selection_group_btns">
                    <input type="radio" value="no" name="driving_license" />
                    <label htmlFor="no">אין</label>
                  </span>
                </div>
              </span>
              <span className="selection_group_package">
                <label className="profile_modal_label">
                  זמין להתנדבות בחירום
                </label>
                <div className="selection_group" onChange={handleChange}>
                  <span className="selection_group_btns">
                    <input type="radio" value="yes" name="emergency" />
                    <label htmlFor="yes">כן</label>
                  </span>
                  <span className="selection_group_btns">
                    <input type="radio" value="no" name="emergency" />
                    <label htmlFor="no">לא</label>
                  </span>
                </div>
              </span>
              {/* <div className="attached_files_types">
                <span className="attached_files">
                  <label className="profile_modal_label">אישור משטרה</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
                <span className="attached_files">
                  <label className="profile_modal_label">הסכם סודיות</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
                <span className="attached_files">
                  <label className="profile_modal_label">חוזה התנדבות</label>
                  <div className="attached_files_btns">
                    <button>
                      <Pdf />
                    </button>
                    <button>
                      <Download />
                    </button>
                  </div>
                </span>
              </div> */}
            </div>
            <div className="profile_modal_content_left">
              <span className="volunteering_hours">
                <label className="profile_modal_label">שעות התנדבות</label>
                <button>
                  <Table />
                </button>
                <button>
                  <Notify />
                </button>
              </span>
              <span className="reported_hours">
                <div className="reported_hours_sum">
                  <label className="profile_modal_label">מדווח</label>
                  <input
                    className="profile_modal_mini_input"
                    type="text"
                    name="volunteer_reported_hours"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="reported_hours_sum">
                  <label className="profile_modal_label">מאושר</label>
                  <input
                    className="profile_modal_mini_input"
                    type="text"
                    name="volunteer_confirm_hours"
                    required
                    onChange={handleChange}
                  />
                </div>
              </span>
              <span className="dates">
                <div className="date">
                  <label className="profile_modal_label">תחילת התנדבות</label>
                  <DatePickerComponent
                    placeholder="הכנס תאריך"
                    format="dd/MM/yyyy"
                    onChange={(e) => onChange(e.target.value)}
                    className="datepicker"
                  />
                </div>
                <div className="date">
                  <label className="profile_modal_label">סיום התנדבות</label>
                  <DatePickerComponent
                    placeholder="הכנס תאריך"
                    format="dd/MM/yyyy"
                    onChange={(e) => onChange(e.target.value)}
                    className="datepicker"
                  />
                </div>
              </span>
              <label className="profile_modal_label">סיכום שיחה אחרונה</label>
              <TextareaAutosize
                type="text"
                name="summary"
                className="summary_text"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileVolunteerModal;
