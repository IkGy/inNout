const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const fs = require('fs');

const index = path.join(__dirname, 'client/build/index.html')
const port = process.env.NODE_ENV || '8080';
const multer = require('multer');


const userRouter = require('./routes/User'); //라우터폴더 안에 User.js를 요청하는 상수(이하 동일)
const roomsRouter = require('./routes/Rooms');
const reviewsRouter = require('./routes/Reviews');
const lodgingsRouter = require('./routes/Lodgings');
const bookingsRouter = require('./routes/Bookings');

const { sequelize } = require('./models/index'); // 라우터 폴터 안에 index.js를 요청하는 상수 (index.js에 있는 상수sequelize만 지정)

app.set('view engine', 'html'); //보이는 부분이 html

app.use(express.json());//클라이언트에서 보내는 값을 json 형식으로 받겠다

app.use(morgan('dev')); //미들웨어 사용선언?(app.use = 항상 실행, morgan = log를 상세히 보여줌(dev버전))

app.use(express.urlencoded({extended:false})); //express자체 서버 설정

app.use("/upload", express.static("upload"));

var cors = require('cors');
const Lodging = require('./models/lodging');
const Room = require('./models/room');

app.use(cors());

app.use('/',express.static(path.join(__dirname, 'client/build'))); //express.static=기본경로


//이미지를 저장하고 불러오기 위한 코드
const upload = multer({ 
    storage: multer.diskStorage({ //저장 설정
        destination: function(req, file, cb) { // 어디에 저장할거냐? upload/
            cb(null, 'upload/') // upload폴더 밑에
        },
        filename: function(req, file, cb){ // 어떤 이름으로 저장할거야?
            cb(null, file.originalname) // 업로드한 file의 오리지널 이름으로 저장하겠다.
        }
    })
})

const makeFolder = (dir)=>{
  if (!fs.existsSync(dir)) {//upload 폴더가 있는지 감지하는 부분
    fs.mkdirSync(dir)
  }
}//현제 폴더에 "upload"폴더가 없는 경우 폴더를 생성해주는 코드
makeFolder("upload")

app.post('/image', upload.single('image'), (req, res)=>{ 
  const file = req.file; 
  console.log("post(/image) file:",file);
  res.send({ 
      imageUrl: "http://13.209.76.233:8080/"+file.destination+file.filename //이미지 여기 저장했다 json형식으로 보냄
  })
})

app.use(`/user`, userRouter);
app.use(`/rooms`, roomsRouter);
app.use('/reviews', reviewsRouter);
app.use('/lodging', lodgingsRouter);
app.use('/bookings', bookingsRouter);


app.get('/', (req,res) => {
  res.sendFile(index)
});

app.get('*', (req,res) => {
  res.sendFile(index)
});

sequelize.sync({ force: false })
  .then(() => {
    console.log("DB연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, function () {
  console.log(`${port}에서 대기중`)
}); 