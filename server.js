const express = require("express");
const cors = require("cors");
const emojiRegex = require("emoji-regex")();
const LineByLineReader = require("line-by-line");
const fileUpload = require("express-fileupload");
const path = require('path');
var fs = require('fs');

const app = express();

// Init Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ extended: false }));
app.use(fileUpload());

// Routes
app.post("/file", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  try {
    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    lr = new LineByLineReader(`${__dirname}/client/public/uploads/${file.name}`);

    let previousDate = new Date();
    const previousUser = null;
    let userName = "", error = false;

    const linkRegEx = new RegExp(
      "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+] |[!*(), ]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
    );

    const data = {
      days: 0,
      numberOfMessages: 0,
      messagesPerDays: new Array(7).fill(0),
      messagesPerHour: new Array(24).fill(0),
      words: 0,
      letters: 0,
      links: 0,
      timeline: [],
      eachData: [
        {
          name: '',
          numberOfMessages: 0,
          words: 0,
          letters: 0,
          messagesPerDays: new Array(7).fill(0),
          messagesPerHour: new Array(24).fill(0),
          emojis: {
            total: 0
          },
          chatPercentage: 0
        },
        {
          name: '',
          numberOfMessages: 0,
          words: 0,
          letters: 0,
          messagesPerDays: new Array(7).fill(0),
          messagesPerHour: new Array(24).fill(0),
          emojis: {
            total: 0
          },
          chatPercentage: 0
        }
      ],
      emojis: {
        total: 0
      },
      totals: {
        numberOfMessages: 0,
        words: 0,
        letters: 0,
        links: 0,
        days: 0,
        deletedMessages: 0,
        imagesSent: 0,
        filesSent: 0,
      },
      averages: {
        messagesPerDay: 0,
        wordsPerDay: 0,
        lettersPerDay: 0,
        wordsPerMessage: 0,
        lettersPerMessage: 0
      },
      deletedMessages: 0,
      imagesSent: 0,
      filesSent: 0,
      startDate: new Date(),
      recentDate: new Date()
    };

    let date;
    let year;
    let month;
    let day;
    let time;
    let min;
    let hour;
    let today;
    let message;

    lr.on("line", line => {
      if (line.match(/(?<=)(.*?)(?= -)/) && line.match(/(?<=- )(.*?)(?=:)/)) {
        // If statement to check if line is new message

        // Date and Time Setup
        date = line.match(/(?<=)(.*?)(?=, [0-9])/)[0];
        date = date.replace(/\//g, "-");
        date = date.split("-");

        year = 2000 + parseInt(date[2]);
        month = date[1];
        day = date[0];

        time = line.match(/(?<=, )(.*?)(?= -)/)[0];
        min = time.match(/(?<=:)(.*)(?= )/)[0];
        if (time.match("pm")) {
          hour = time.match(/(?<=)(.*)(?=:)/)[0].includes("12")
            ? parseInt(time.match(/(?<=)(.*)(?=:)/)[0])
            : 12 + parseInt(time.match(/(?<=)(.*)(?=:)/)[0]);
        } else {
          hour =
            time.match(/(?<=)(.*)(?=:)/)[0].length === 2
              ? time.match(/(?<=)(.*)(?=:)/)[0].includes("12")
                ? "00"
                : time.match(/(?<=)(.*)(?=:)/)[0]
              : `0${time.match(/(?<=)(.*)(?=:)/)[0]}`;
        }

        today = new Date(`${year}-${month}-${day}T${hour}:${min}:00`);

        if (previousDate.toDateString() !== today.toDateString()) {
          // Check if previous day is same as today

          let obj = {
            date: today,
            messages: 0
          };

          // data.timelineTotalMessages.push(0);
          data.days++; // Total number of days
          data.totals.days++;
          // data.timelineDates.push(today);
          data.timeline.push(obj);
        }

        // data.timelineTotalMessages[data.timelineTotalMessages.length - 1]++;
        data.timeline[data.timeline.length - 1].messages++;
        previousDate = today;

        if (data.numberOfMessages === 0) {
          data.startDate = today;
        } else {
          data.recentDate = today;
        }

        // Name setup
        userName = line.match(/(?<=- )(.*?)(?=:)/)[0];

        // Imporve later, make more efficient
        if (!data.eachData.find(({ name }) => name === userName)) {
          data.eachData.find(({ name }) => name === "").name = userName;
        }

        data.eachData.find(({ name }) => name === userName).numberOfMessages++;
        data.eachData.find(({ name }) => name === userName).messagesPerDays[
          today.getDay()
        ]++;
        data.eachData.find(({ name }) => name === userName).messagesPerHour[
          today.getHours()
        ]++;

        data.messagesPerHour[today.getHours()]++; // Messages on each day of the week
        data.messagesPerDays[today.getDay()]++; // Messages on each day of the week
        data.numberOfMessages++; // Total number of Messages
        data.totals.numberOfMessages++; // Total number of Messages

        message = line.match(/(?<=: )(.*)(?=)/)[0];
      } else {
        message = line;
      }

      // Checks for links in message
      if (message.match(linkRegEx)) {
        data.links++;
        data.totals.links++;

        message = message.replace(linkRegEx, "");
      }

      // Checks for emojis and updates data
      if (message.match(emojiRegex)) {
        const emoji = message.match(emojiRegex)[0];

        if (data.eachData.find(({ name }) => name === userName).emojis[emoji]) {
          data.emojis[emoji]++;
          data.eachData.find(({ name }) => name === userName).emojis[emoji]++;
        } else {
          data.emojis[emoji] = 1;
          data.eachData.find(({ name }) => name === userName).emojis[emoji] = 1;
        }

        data.emojis.total++;
        data.eachData.find(({ name }) => name === userName).emojis.total++;
      }

      // Check for Special cases
      if (message.includes("You deleted this message")) {
        data.deletedMessages++;
        data.totals.deletedMessages++;
      } else if (message.includes("<Media omitted>")) {
        data.deletedMedia++;
        data.totals.deletedMedia++;
      } else if (message.includes("(file attached)")) {
        data.filesSent++;
        data.totals.filesSent++;
      } else {
        message = message.replace(/ {2,}/g, " ");
        message = message.replace(/[^A-Za-z0-9 ]/g, ""); // Remove all special characters
        message = message.split(" ");
        data.words += message.length;
        data.totals.words += message.length;
        data.eachData.find(({ name }) => name === userName).words += message.length;
        message = message.join("");
        data.letters += message.length;
        data.totals.letters += message.length;
        data.eachData.find(({ name }) => name === userName).letters += message.length;
      }

      // if (data.numberOfMessages > 5) {
      //   lr.close();
      // }
    });

    lr.on("end", () => {
      data.averages.messagesPerDay = Number(
        (data.numberOfMessages / data.days).toFixed(2)
      );
      data.averages.wordsPerDay = Number((data.words / data.days).toFixed(2));
      data.averages.lettersPerDay = Number((data.letters / data.days).toFixed(2));

      data.averages.wordsPerMessage = Number(
        (data.words / data.numberOfMessages).toFixed(2)
      );
      data.averages.lettersPerMessage = Number(
        (data.letters / data.numberOfMessages).toFixed(2)
      );

      data.eachData.forEach(
        el =>
          (el.chatPercentage = Number(
            ((el.numberOfMessages / data.numberOfMessages) * 100).toFixed(2)
          ))
      );

      console.log("Done parsing");
    });

    lr.on('error', function (err) {
      console.log(err)
      res.status(500).send("Server Error");
    });

    lr.on("end", () => {
      res.json({ data })
      fs.unlinkSync(`${__dirname}/client/public/uploads/${file.name}`);
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// RegExp to get parts from each line
// Name -> /(?<=- )(.*)(?=:)/
// Date -> /(?<=)(.*)(?=, [0-9])/
// Time -> /(?<=, )(.*)(?= -)/
// Date and Time -> /(?<=)(.*)(?= -)/
// Message -> /(?<=: )(.*)(?=)/
// Emoji -> /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
 