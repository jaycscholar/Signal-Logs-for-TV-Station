document.getElementById("testingElements").style.display = "none";
  


let testing = false;

function showTestElements () {
  document.getElementById("testingElements").style.display = "";
    console.log(document.getElementById("testingElements").style.display);

}

if (testing) {
  showTestElements ();
}
      
      // =====================
      // CONFIG
      // =====================
      const checkIntervalMinutes = 30; //interval check in minutes - Should be 30
let tallyRecord = 0;
let alarm = false;


tallyRecord = Number(localStorage.getItem("storedTallyRecord"));
console.log(tallyRecord);



      // =====================
      // INTERVAL TRACKING
      // =====================
      function getIntervalId(date = new Date()) {
        const day = date.toISOString().slice(0, 10); // YYYY-MM-DD
        const hour = date.getHours();
        const interval = Math.floor(date.getMinutes() / checkIntervalMinutes);

if(hour === 1 || hour === 10 || hour === 5) {
document.getElementById('lunchBox').style.display = "";

}
console.log("this is the hour in the interval ID" + hour)

        return `${day}-${hour}-${interval}`;
      }

      let lastCheckedIntervalId = localStorage.getItem("lastCheckedIntervalId");
      let lastCheck = "";


      // =====================
      // COUNTDOWN
      // =====================
      let remainingSeconds = 0;
      let signalCheckMissed = false;
      let checkedForInterval = false; //maybe set it to true

      function updateTestTime() {
        console.log(remainingSeconds);
        remainingSeconds = document.getElementById("testtime").value * 60;
        console.log(remainingSeconds);
      }

      function lunchTime() {
        console.log(remainingSeconds);
        remainingSeconds = remainingSeconds + 30*60;
        console.log(remainingSeconds);
document.getElementById('lunchBox').style.display = "none";
      }

      const countdownEl = document.getElementById("countdown");
      const warningBoxEl = document.getElementById("warningBox");

      function initializeCountdown() {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        let nextIntervalMinute =
          (Math.floor(minutes / checkIntervalMinutes) + 1) *
          checkIntervalMinutes;

        if (nextIntervalMinute >= 60) nextIntervalMinute = 0;

        let minutesUntil = nextIntervalMinute - minutes - 1;
        let secondsUntil = 60 - seconds;

        if (minutesUntil < 0) minutesUntil += 60;

        remainingSeconds = minutesUntil * 60 + secondsUntil;

        console.log(remainingSeconds);
      }

      function updateCountdown() {

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        countdownEl.textContent = `Check due at ${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;

          // So the timer can turn at 25 minutes
if (minutes === 24) {

           //option A
          //Option B
 warningBoxEl.style.display = "none";
          
       
         if (!checkedForInterval) {
          
         
            //alarm = false;
          }  

//everything gets reset at min 25
alarm = false;
countdownEl.style.display = ""; 
checkForInterval = false;
signalCheckMissed = false;

             
}

        if (remainingSeconds <= 300 && remainingSeconds > 1 && !checkedForInterval ) {
          warningBoxEl.textContent = "⚠ SIGNAL CHECK NOW ⚠";
          warningBoxEl.classList.add("yellow");
          
            warningBoxEl.style.display = "" ;
            
        }

        //timer ends
        if (remainingSeconds <= 0) {
          const currentIntervalId = getIntervalId();

          if (!checkedForInterval) {
            signalCheckMissed = true;
          }

          countdownEl.style.display = "";

          //if signal was missed

          if (signalCheckMissed) {
            warningBoxEl.textContent = "⚠ SIGNAL CHECK OVERDUE ⚠";
            
            warningBoxEl.style.display = "" ;
            
            warningBoxEl.classList.remove("yellow");
            warningBoxEl.classList.add("show");
            console.log("warningbox on");

            tallyRecord = 0;
        updateRecord();
     // optional beep
     if (!alarm){ 
      new Audio(
         "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        ).play();
        alarm = true;
}

 

          } else {
            countdownEl.textContent = "✔ Interval completed";
            countdownEl.classList.remove("alert");
            warningBoxEl.classList.remove("show");
            warningBoxEl.classList.remove("yellow");
            warningBoxEl.style.display = "" ;

            console.log("warningbox off");
          }

          checkedForInterval = false;
          initializeCountdown();

document.getElementById('lunchBox').style.display = "";
          return;
        }
        // console.log("4remainig seconds", remainingSeconds);
        //  console.log("4TcheckedForInterval ", checkedForInterval);
        //  console.log("4TsignalCheckMissed", signalCheckMissed);

        remainingSeconds--;
      }

      // =====================
      // CLOCK
      // =====================
      function updateClock() {
        document.getElementById("timeDisplay").innerText =
          "Current Time: " + new Date().toLocaleString();
      }
      setInterval(updateClock, 1000);
      updateClock();

      //let midnight = [0, 0, 0];
      //if( timeToSeconds( nextCheckTime) ===  timeToSeconds(midnight)){
      //console.log("it's midnight")
      //nextCheckTime = [24, 0, 0]
      //}

      let logs = JSON.parse(localStorage.getItem("signalLogs") || "[]");

      // =========================
      // Logging
      // =========================

      function submitChecks() {
        const operator = document.getElementById("operator").value;

        if (!operator) {
          alert("Please select operator.");
          return;
        }

    const anyChecked = document.querySelectorAll('#signals input:checked').length > 0;

    console.log("anyChecked". anyChecked)

if (!anyChecked) {
  alert("Please check at least one signal.");
  return;
}

        const now = new Date();
        const entry = {
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          operator: operator,
          notes: document.getElementById("notes").value,
        };

        signalList.forEach((sigObj) => {
          const mainId = sigObj.name.replace(/\s/g, "_");
          entry[sigObj.name] = document.getElementById(mainId).checked;

          if (sigObj.subChecks) {
            sigObj.subChecks.forEach((sub) => {
              const subId = `${mainId}_${sub.replace(/\s/g, "_")}`;
              entry[`${sigObj.name} ${sub}`] =
                document.getElementById(subId).checked;
            });
          }
        });

        logs.push(entry);
        localStorage.setItem("signalLogs", JSON.stringify(logs));

        sendToSheets(entry, "Log");
        console.log(entry);

        clearAllChecks();
        updateTimerAndWarnings();
        initializeCountdown();
      }

      function updateTimerAndWarnings() {
        countdownEl.style.display = "none";


        console.log("checked for interval = ", checkedForInterval);

        if (!checkedForInterval) {
          
           tallyRecord += 1;
           
          updateRecord();
          //countdownEl.style.display = "";
          //countdownEl.classList.remove("alert");
          //warningBoxEl.classList.remove("yellow");
        }



        warningBoxEl.style.display = "none" ;
        checkedForInterval = true;
        signalCheckMissed = false;

        warningBoxEl.classList.remove("show");

        const currentIntervalId = getIntervalId();
        lastCheckedIntervalId = currentIntervalId;
        localStorage.setItem("lastCheckedIntervalId", currentIntervalId);

        console.log("lastCheckedIntervalId = ", lastCheckedIntervalId);
        console.log("currentIntervalId = ", currentIntervalId);

        signalCheckMissed = false;
      }

      function clearAllChecks() {
        signalList.forEach((sigObj) => {
          const mainId = sigObj.name.replace(/\s/g, "_");
          document.getElementById(mainId).checked = false;

          if (sigObj.subChecks) {
            sigObj.subChecks.forEach((sub) => {
              const subId = `${mainId}_${sub.replace(/\s/g, "_")}`;
              document.getElementById(subId).checked = false;
            });
          }
        });

        const notesBox = document.getElementById("notes");
        notesBox.classList.remove("redNotesBox");
        notesBox.value = "";
        notesBox.placeholder = "Notes"

      }

      const signalList = [
        { name: "RX SPECTRUM", subChecks: ["CC"] },
        { name: "RX KDOC", subChecks: ["CC"] },
        { name: "RX DIRECTV", subChecks: ["CC"] },
        { name: "RX SAT" },
        { name: "RX DISH NETWORK", subChecks: ["CC"] },
        { name: "TX SPECTRUM" },
        { name: "TX DIRECTV" },
        { name: "TX DISH NETWORK" },
        { name: "TX VEGAS PHOENIX" },
        { name: "TX COMCAST" },
        { name: "TX KDOC" },
        { name: "TX SAT" },
        { name: "TX PRIMARY STREA" },
        { name: "TX BACK-UP STREA" },
        { name: "TX WEB APPS" },
      ];

      function renderSignals() {
        const container = document.getElementById("signals");
        container.innerHTML = "";

        signalList.forEach((sigObj) => {
          const mainId = sigObj.name.replace(/\s/g, "_");

          let html = `
<div class="signal-item">
<label>
<input type="checkbox" id="${mainId}">
${sigObj.name}
</label>
`;

          // Add sub checks (like CC)
          if (sigObj.subChecks) {
            sigObj.subChecks.forEach((sub) => {
              const subId = `${mainId}_${sub.replace(/\s/g, "_")}`;

              html += `
<div style="margin-left:20px; margin-top:5px;">
<label>
<input type="checkbox" id="${subId}">
${sub}
</label>
</div>
`;
            });
          }

          html += `</div>`;

          container.innerHTML += html;
        });
      }

      function checkAllSignals() {
        signalList.forEach((sigObj) => {
          const mainId = sigObj.name.replace(/\s/g, "_");
          document.getElementById(mainId).checked = true;

          if (sigObj.subChecks) {
            sigObj.subChecks.forEach((sub) => {
              const subId = `${mainId}_${sub.replace(/\s/g, "_")}`;
              document.getElementById(subId).checked = true;
            });
          }
        });
      }

      renderSignals();
      // =========================
      // Report Error
      // =========================

      function submitError() {
        const operator = document.getElementById("operator").value;

        if (!operator) {
          alert("Please select operator.");
          return;
        }

        const userNotes = document.getElementById("notes").value;
        const notesBox = document.getElementById("notes");
        console.log("userNotes");

        if (!userNotes) {
          //alert("Please add notes.");
          notesBox.placeholder = "-- Por favor escriba cual es el error --"
          notesBox.classList.add("redNotesBox");
          return;
        }

        const now = new Date();
        const entry = {
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          operator: operator,
          notes: "Error note: " + userNotes,
        };

        logs.push(entry);
        localStorage.setItem("signalLogs", JSON.stringify(logs));

        sendToSheets(entry, "Error");
        console.log(entry);

        notesBox.classList.remove("redNotesBox");
        console.log("Report Sent");

        document.getElementById("notes").value = "";
        notesBox.placeholder = "Notes "

      }

      // =========================
      // Google Sheets POST
      // Requires Apps Script endpoint
      // =========================
      async function sendToSheets(entry, sentStatus = "Something") {
        const endpoint =
          "https://script.google.com/macros/s/AKfycbx1f3dIyJrWjQSU5RVFZz7ja7wFz0IxivrLzAD2YxJ-LRInoryp08zqIqVlikHujLl_VA/exec";

        console.log("async function activated");
        //counting = false;

        try {
          await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(entry),
            mode: "no-cors",
          });

          const sentAt = entry.timestamp
            ? new Date(entry.timestamp)
            : new Date();
          status(`${sentStatus} sent to Sheets at ${sentAt.toLocaleString()}`);
          
        


          lastCheck = sentAt;
               const lastCheckB = document.getElementById("lastCheckBox");
lastCheckB.textContent = " --- Last Check at " +  lastCheck.toLocaleString([], {hour:'numeric', minute: 'numeric', second: '2-digit' });
//lastCheckB.textContent = ""
          
        } catch (e) {
          console.error(e);
          status("Sheets send failed.");
        }
      }

      function status(msg) {
        document.getElementById("statusMsg").innerText = msg;
      }

              function updateRecord() {
                

                document.getElementById("tallyBox").innerText = `Current tally ${tallyRecord} successful logs`;
                

        localStorage.setItem("storedTallyRecord", tallyRecord);

          }

          updateRecord();

      // =====================
      // ACTIONS
      // =====================
      initializeCountdown();
      setInterval(updateCountdown, 1000);
