import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
const app = express();

// parsers

const corsOptions = {
  //origin: "https://client-weld-omega.vercel.app",
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // Allow credentials
};

app.use(cors({ ...corsOptions }));

app.use(express.json());
app.use(cookieParser());

//app.use(function (req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//  // allow preflight
//  if (req.method === "OPTIONS") {
//    res.send(200);
//  } else {
//    next();
//  }
//});

app.get("/", (req: Request, res: Response) => {
  res.send("'Hello World' From Smartphone Management Server");
});
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
