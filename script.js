//for each column its shows the hour, text box, and save button
//Using jquery it loads the hour, text box, and save button
function row(data) {
  return `
    <div class="row time-block">
        <div class="hour col-1">${generateTime(data.i)}</div>
        <textarea style="color: black;" rows="2" class="past description col-10"  id="note-${
          data.i
        }">${data.entry}</textarea>
        <button class="saveBtn" id="saveButton-${data.i}" data-entry="${
    data.i
  }">
          <i class="fas fa-save"></i>
        </button>
      </div>
    
    `;
}
//constant variable using jquery targeting class container in html
const container = $(".container");
//if anything is saved in locatStorage to get the information
const workday = localStorage.getItem("workday")
  ? //checking if anything is in localStorage
    //if so parse turns it back into a string that localStorage can read
    JSON.parse(localStorage.workday)
  : {};

//it goes through each hour of the day
//i is for the number of hours of that day schedule
//entry is for textbox text
for (let i = 0; i < 9; i++) {
  container.append(
    row({
      i,
      entry: workday["h_" + i] || "",
    })
  );
  //every time the save button is clicked it saves the text inputted
  $("#saveButton-" + i).on("click", function (e) {
    let id = e.target.dataset.entry;
    //what ever was saved in textbox is stored in workday
    workday["h_" + id] = $("#note-" + id).val();
    //gets information from the localStorage JSON.stringify is turning into string
    localStorage.setItem("workday", JSON.stringify(workday));
  });
}

function saveToStorage(entry) {}

//this is for the day starting at 9AM and adding for how may hours are included in the for loop
function generateTime(i) {
  const now = new Date();
  now.setHours(9 + i);
  return moment(now).format("h a");
}
//have the Day of the week, Month, and the Day on top of the
$("#currentDay").text(moment().format("dddd, MMMM Do"));
