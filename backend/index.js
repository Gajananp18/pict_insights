const express = require('express');
const cors = require("cors");

const Studentrouter = require('./routes/StudentRoutes');
const Adminrouter = require('./routes/AdminRoutes');

const HomePageStudentRouter = require('./routes/StudentHomePageRouter');
const studentProfileUpload = require('./routes/StudentProfileImageRoutes')

const getNoticeData = require('./routes/DataNoticeRoutes')
const getInternshipData = require('./routes/DataInternshipRoutes')
const getPlacementData = require('./routes/DataPlacementRouter')

const NoticePostRoutes = require('./routes/AdminNoticeUploadRoutes');
const PlacementPostRoutes = require('./routes/AdminPlacementUploadRoutes');
const InternshipPostRoutes = require('./routes/AdminInternshipRoutes');

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth/student', Studentrouter);
app.use('/auth/student', HomePageStudentRouter);
app.use('/auth/student', studentProfileUpload);

app.use('/auth/student', getNoticeData);
app.use('/auth/student', getInternshipData);
app.use('/auth/student', getPlacementData);

app.use('/auth/admin', Adminrouter);
app.use('/auth/admin', NoticePostRoutes);
app.use('/auth/admin', PlacementPostRoutes);
app.use('/auth/admin', InternshipPostRoutes);

app.get("/", (req, res) => {
    res.send("Chal raha hu bhai...");
})

app.listen(port, () => {
    console.log("Helloooowww... 8000");
})

