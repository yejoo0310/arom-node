import { Router } from 'express';
import { UserModel } from '../schema/userSchema.js';

const UserRouter = new Router();

UserRouter.post('/', async (req, res)=>{
    const data = {
        id: req.body.id,
        password: req.body.password,
    }
    const result = await UserModel.create(data); // json 로 된 응답 데이터를  읽기 위헤
    // console.log(req.body);
    // res.json(req.body);
    res.json(result);
    // try {
    //     const data = {
    //         id: req.body.id,
    //         password: req.body.password
    //     };
    //     const result = await UserModel.create(data);
    //     res.json(result);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
});

UserRouter.get('/', async (req, res)=>{
    //res.send('GET 요청 받음'); // 이 내용이 postman 에 뜸

    const result = await UserModel.findById(req.params.id);
    res.json(result);
});

UserRouter.patch('/', async (req, res)=>{
    //res.send('PATCH 요청 받음');
    const result = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

UserRouter.delete('/', async (req, res)=>{
    //res.send('DELETE 요청 받음');
    const result = await UserModel.findOneAndDelete(req.params.id);
    res.json(result);
});

export default UserRouter;



/*
client (postman) 에서 정보를 보내는 방법은
post body raw json 을 이용하면 됨 (거의 모든 데이터는 json 형식으로 보냄)

postman 에서 내용을 적으면 됨
*/