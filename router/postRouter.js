import Router from "express";
import { PostModel } from "../schema/postSchema.js";
import mongoose from "mongoose";

const PostRouter = new Router();

PostRouter.post("/post", async (req, res) => {
  const data = {
    Title: req.body.title,
    Content: req.body.content,
  };

  if (!data.Title || !data.Content) {
    // 요청에 빈 값이 있는 경우
    res.status(400).json({
      // status(400) 사용자에게 문제가 있다
      message: "비어있는 값이 있습니다.",
    });
    return;
  }
  console.log(data);
  try {
    const result = await PostModel.create(data); //데이터를 db에 저장
    console.log(result);

    const post_title = result.Title;

    //res.json(result);

    res.status(200).json({
      // 200은 성공적으로 처리되었다
      message: "게시글이 정상적으로 생성되었습니다.",
      post_title: post_title,
    });
  } catch (error) {
    res.status(500).json({
      //서버에 문제가 있다 status(500)
      message: "error",
    });
  }
});

PostRouter.get("/post", async (req, res) => {
  try {
    const result = await PostModel.find(); // db에서 데이터 전체 조회
    console.log(result);

    res.status(200).json({
      // 200은 성공적으로 처리되었다
      message: "게시글 목록입니다.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      //서버에 문제가 있다 status(500)
      message: error.message,
    });
  }
});

PostRouter.get("/post/:id", async (req, res) => {
  try {
    const result = await PostModel.findById(req.params.id);
    console.log(result);

    res.status(200).json({
      message: `${req.params.id} 게시글입니다.`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      //서버에 문제가 있다 status(500)
      message: error.message,
    });
  }
});

// PostRouter.patch("/post/:id", async (req, res) => {
//   try {
//     const result = await PostModel.findByIdAndUpdate(req.params.id, req.body);
//     console.log(result);

//     res.status(200).json({
//       message: "데이터 수정을 완료했습니다.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       //서버에 문제가 있다 status(500)
//       message: error.message,
//     });
//   }
// });

PostRouter.patch("/post/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    // document id 유효성 검사
    return res.status(400).json({
      message: "유효하지 않은 id 값입니다.",
    });
  }
  try {
    const result = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(400).json({
        message: "해당 id의 문서를 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "데이터 수정을 완료했습니다.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

PostRouter.delete("/post/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "유효하지 않은 id 값입니다.",
    });
  }
  try {
    const result = await PostModel.findByIdAndDelete(req.params.id);
    console.log(result);

    res.status(200).json({
      message: "데이터 삭제를 완료했습니다.",
    });
  } catch (error) {
    res.status(500).json({
      //서버에 문제가 있다 status(500)
      message: error.message,
    });
  }
});

//PostRouter;

export default PostRouter;
