import "./reviewwrite.css";
import reviewImg from "./../detail/image/detailslide1.jpg";
import axios from "axios";
import { API_URL } from "../config/contansts";
import { getCookie } from "../../useCookies";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ReviewWrite() {
  const id = useLocation().state;
  console.log('test',id);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData =  async()=>{
    await axios.get(`${API_URL}/bookings/review`, {
      params: { id: id },
    }).then((response)=>{
      console.log(response.data[0]);
      setData(response.data[0])
    })
  }
  useEffect(()=>{
    getData();
  },[])

  const writepost = async (e) => {
    e.preventDefault();
    const star = e.target.rating.value;
    const reviewcontent = e.target.reviewWritecontent.value;
    console.log(reviewcontent);
    await axios.post(`${API_URL}/reviews`, {
        rooms_id: id,
        user_id: getCookie("user_Code"),
        rating: star,
        content: reviewcontent,
      })
      .then(() => {
        console.log("성공");
      })
      .catch((e) => {
        console.log("에러남");
        console.error(e);
      });
      navigate("/")
  };

  return (
    <div className="hotel-container">
      <div className="reviewWritepageTitle">
        <div className="container">
          <div className="searchTitle">리뷰작성</div>
        </div>
      </div>
      <div className="reviewWritebackGround">
        <div className="reviewWriteGridBox container">
          <div className="reviewWriteImg">
            <img src={data.image_u_r_l}></img>
          </div>

          <div className="reviewWriteinputBox">
            <div className="reviewWriteinput">
              <form onSubmit={writepost}>
                <div className="reviewWriteinputGridBox">
                  <div className="reviewproductTtile">{data.name}</div>
                  <div className="reviewFormrating">
                    <div class="star-rating space-x-4 mx-auto">
                      <input
                        type="radio"
                        id="5-stars"
                        name="rating"
                        value="5"
                        v-model="ratings"
                      />
                      <label for="5-stars" class="star pr-4">
                        ★
                      </label>
                      <input
                        type="radio"
                        id="4-stars"
                        name="rating"
                        value="4"
                        v-model="ratings"
                      />
                      <label for="4-stars" class="star">
                        ★
                      </label>
                      <input
                        type="radio"
                        id="3-stars"
                        name="rating"
                        value="3"
                        v-model="ratings"
                      />
                      <label for="3-stars" class="star">
                        ★
                      </label>
                      <input
                        type="radio"
                        id="2-stars"
                        name="rating"
                        value="2"
                        v-model="ratings"
                      />
                      <label for="2-stars" class="star">
                        ★
                      </label>
                      <input
                        type="radio"
                        id="1-star"
                        name="rating"
                        value="1"
                        v-model="ratings"
                      />
                      <label for="1-star" class="star">
                        ★
                      </label>
                    </div>
                  </div>
                </div>

                <textarea
                  id="reviewWritecontent"
                  className="reviewFormcontent"
                  placeholder="리뷰 내용"
                ></textarea>

                <div className="reviewWriteBtnBox">
                  <button type="submit">작성 완료</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewWrite;
