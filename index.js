import express from 'express';
import UserRouter from './router/userRouter.js';
import mongoose from 'mongoose';
import PostRouter from './router/postRouter.js';

const app = new express(); // app은 express의 인스턴스
// 이 app이라는 인스턴스를 조작하여 서버 작업 가능 

// 첫번째 인자 : 문자열 (<- 요청을 받을 url)
// 두번째 인자 : 콜백함수 
// 콜백함수의 첫번째 인자는 요청에 대한 정보, 두번째 인자는 응답에 대한 정보

app.use(express.json()); // body를 읽어올 준비
/* 이 요청을 main 함수인 index에 다 작성하면 너무 길어지기 때문에 router에 따로 작성하고 내보낸 UserRouter를 이용해 app.use(UserRouter) 사용 */
app.use(UserRouter);
// 만약 응답받는 url을 고치고 싶으면
// app.use('/user', UserRouter); 로 앞에 인자를 응답받는 url로 고치면 됨
app.use(PostRouter);

mongoose.connect("mongodb+srv://username:3ZB6PRgrvsA_HQ3@cluster0.fgvtrx1.mongodb.net/Arom?retryWrites=true&w=majority&appName=Cluster0")
// 물음표 앞의 문자열이 내가 사용할 데이터베이스의 이름 (즉, Arom)

app.listen(8000, ()=>{
    console.log("서버 실행됨");
})
