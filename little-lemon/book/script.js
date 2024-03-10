var reservedTables = {
	record1: {
		table: "b1",
		owner: {
			fname: "Julian",
			lname: "Froster"
		}
	},
	record2: {
		table: "a3",
		owner: {
			fname: "Peter",
			lname: "Müller"
		}
	},
	record3: {
		table: "b5",
		owner: {
			fname: "Janina",
			lname: "Schmidt"
		}
	},
};

function makeRows(sectionLength,placement) {
  const rows = ["a", "b"];

  let html = "";
  let counter = 1;

  rows.forEach(row => {
        html += `<div class="label">${row}</div>`;
    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
      if (counter == 6){counter= 1}
    }
  });
  document.getElementById(placement).innerHTML = html;
}

makeRows(5,'ab-rows');

(()=>{
  "use strict"
  for(const key in reservedTables){
    if(reservedTables.hasOwnProperty(key)){
    const obj = reservedTables[key];
    document.getElementById(obj.table).classList='r';
    document.getElementById(obj.table).innerHTML='R';
  } 
  }

  let selectedTables = [];
  const tables = document.querySelectorAll('.a');
  tables.forEach(table=>{
    table.addEventListener('click', (event)=>{
      tableSelectionProcess(table.id)
    })
  })
  function tableSelectionProcess(thistable){
    if(!document.getElementById(thistable).classList.contains('r')){

      const index = selectedTables.indexOf(thistable);
      
      if(index>-1){
        selectedTables.splice(index,1);
        document.getElementById(thistable).className = "a";
      }else{
        selectedTables.push(thistable);
        document.getElementById(thistable).className = "s";
      }
    
      manageConfirmForm();
      console.log(selectedTables);
  }
  }

  document.getElementById('reserve').addEventListener('click', (event)=>{
    event.preventDefault();

    document.getElementById('resform').style.display='block';
  });

  document.getElementById('cancel').addEventListener('click', (event)=>{
    event.preventDefault();
    document.getElementById('resform').style.display='none';
  });

  function manageConfirmForm(){
    if(selectedTables.length > 0){
      document.getElementById('confirmres').style.display='block';

      if(selectedTables.length === 1){
        document.getElementById('selectedTables').innerHTML = `you have selected table ${selectedTables[0]}`;
      }else{
        let tablesString = selectedTables.toString();
        tablesString = tablesString.replace(/,/g, ", ");
        tablesString = tablesString.replace(/,(?=[^,]*$)/, ' and');
        document.getElementById('selectedTables').innerHTML = `you have selected tables ${tablesString}`;
      }
    }else {
      document.getElementById('confirmres').style.display='none';
      document.getElementById('selectedTables').innerHTML = 'you need to select a table to reserve. <br> <a href="#" id="error">Close</a> this dialog box and pick at least one seat';

      document.getElementById('error').addEventListener('click', ()=>{
        document.getElementById('resform').style.display="none";
      })
    }
  }

  manageConfirmForm();

  document.getElementById('confirmres').addEventListener('submit',(event)=>{
    event.preventDefault();
    processReservation();
  })

  function processReservation(){
    const hardCodedRecords = Object.keys(reservedTables).length;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    let counter = 1;
    let nextRecord= '';

  selectedTables.forEach(function(thistable){
    document.getElementById(thistable).className = 'r';
    document.getElementById(thistable).innerHTML = 'R';

    nextRecord = `record${hardCodedRecords + counter}`;
    reservedTables[nextRecord] = {
      seat:thistable,
      owner: {
        fname:fname,
        lname:lname
      }
    }
    counter++;
  });
  document.getElementById('resform').style.display = "none";
  selectedTables = [];
  manageConfirmForm();
  }
})()