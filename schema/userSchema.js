import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ // mongoose 안에 schema라는 클래스 이용
    id: { type: String, required: true, unique: true}, // 키와 속성 // 타입, 필수값, 고유값
    password: { type: String, required: true} // 비워두면 false 값으로 들어감
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel, UserSchema };