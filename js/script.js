import * as courseInfo from './hole_data.js';
import * as utils from './utils.js';


const showScorecardButton = document.getElementById('showScorecardButton'),
	playerNameInputCard = document.getElementById('player-names-input-card'),
	playerNameSubmitButton = document.getElementById('player-name-submit-button'),
	team1player1NameInput = document.getElementById('team1player1Name-input'),
	team1player2NameInput = document.getElementById('team1player2Name-input'),
	team2player1NameInput = document.getElementById('team2player1Name-input'),
	team2player2NameInput = document.getElementById('team2player2Name-input'),
	changeHoleButton = document.getElementById('change-hole-button'),
	courseHoleSelectionCard = document.getElementById('selector-card'),
	holeselectform = document.getElementById('hole-select-form'),
	courseSelectForm = document.getElementById('course-select-form'),
	courseDropdown = document.getElementById('course-select'),
	holeDropdown = document.getElementById('hole-select'),
	courseHoleSubmitButton = document.getElementById('submit-hole-button'),
	holeInfoCard = document.getElementById('hole-info-display'),
	courseNameDisplay = document.getElementById('course-name-display'),
	holeNumberDisplay = document.getElementById('hole-number-display'),
	holeParDisplay = document.getElementById('par-display'),
	hdcpDisplay = document.getElementById('hdcp-display'),
	distanceDisplay = document.getElementById('distance-display'),
	scoreEntryCard = document.getElementById('scores-entry-card'),
	//team1Label = document.getElementById('team1-label'),
	team1player1Label = document.getElementById('team1player1-label'),
	team1player1ScoreInput = document.getElementById('team1player1-score-input'),
	team1player2Label = document.getElementById('team1player2-label'),
	team1player2ScoreInput = document.getElementById('team1player2-score-input'),
	//team2Label = document.getElementById('team2-label'),
	team2player1Label = document.getElementById('team2player1-label'),
	team2player1ScoreInput = document.getElementById('team2player1-score-input'),
	team2player2Label = document.getElementById('team2player2-label'),
	team2player2ScoreInput = document.getElementById('team2player2-score-input'),
	///Plus Minus Buttons
	team1player1ScorePlusButton = document.getElementById('player1team1-plus-button'),
	team1player1ScoreMinusButton = document.getElementById('player1team1-minus-button'),
	team1player2ScorePlusButton = document.getElementById('player2team1-plus-button'),
	team1player2ScoreMinusButton = document.getElementById('player2team1-minus-button'),
	team2player1ScorePlusButton = document.getElementById('player1team2-plus-button'),
	team2player1ScoreMinusButton = document.getElementById('player1team2-minus-button'),
	team2player2ScorePlusButton = document.getElementById('player2team2-plus-button'),
	team2player2ScoreMinusButton = document.getElementById('player2team2-minus-button'),
	//submit button
	submitPageButton = document.getElementById('submit-page-button'),
	holeResultModalHeader = document.getElementById('hole-result-modal-header'),
	//modalBody = document.getElementById('hole-result-modal-boy'),
	team1ScoreModalLabel = document.getElementById('team1-score-modal-label'),
	team1ScoreDisplayModal = document.getElementById("team1-score-modal"),
	team2ScoreModalLabel = document.getElementById('team2-score-modal-label'),
	team2ScoreDisplayModal = document.getElementById("team2-score-modal"),
	holeOverallReportModal = document.getElementById("hole-overall-report"),
	nextHoleButton = document.getElementById('next-hole-button'),
	completeRoundButton = document.getElementById('complete-round-button'),
	//ScoreCard Modal
	scorecard_t1p1_name = document.getElementById('scorecard-team1player1-name'),
	scorecard_t1p2_name = document.getElementById('scorecard-team1player2-name'),
	scorecard_t2p1_name = document.getElementById('scorecard-team2player1-name'),
	scorecard_t2p2_name = document.getElementById('scorecard-team2player2-name');
//Setting Display settings
courseHoleSelectionCard.style.display = 'none';
holeselectform.style.display = 'none';
showScorecardButton.style.display = 'none';
function selectHoleCardStyle() {
	if (holeselectform.style.display === 'none') {
		courseSelectForm.classList.add('col-12');
	} else {
		courseSelectForm.classList.add('col-6');
	};
}
selectHoleCardStyle();

scoreEntryCard.style.display = 'none';
holeInfoCard.style.display = 'none';
changeHoleButton.style.display = 'none';
holeDropdown.value = 0;
//Initialize Variables
let courseHoleCardValid = false,
	nameCardValid = false,
	//startOnOne = true,
	playerNamesExist = false;

function liveValidateNameCard() {
	if (team1player1NameInput.value === '') {
		nameCardValid = false;
	} else if (team1player2NameInput.value === '') {
		nameCardValid = false;
	} else if (team2player1NameInput.value === '') {
		nameCardValid = false;
	} else if (team2player2NameInput.value === '') {
		nameCardValid = false;
	} else {
		nameCardValid = true;
		playerNameSubmitButton.disabled = false;
	};
}

team1player1NameInput.addEventListener('input', liveValidateNameCard)
team1player2NameInput.addEventListener('input', liveValidateNameCard)
team2player1NameInput.addEventListener('input', liveValidateNameCard)
team2player2NameInput.addEventListener('input', liveValidateNameCard)

function writeNamesLocal() {
	localStorage.setItem('team1player1Name', team1player1NameInput.value);
	localStorage.setItem('team1player2Name', team1player2NameInput.value);
	localStorage.setItem('team2player1Name', team2player1NameInput.value);
	localStorage.setItem('team2player2Name', team2player2NameInput.value);
	playerNamesExist = true;
}

function writeNamesToEnterScores(n) {
	let t1p1_Name = localStorage.getItem('team1player1Name'),
		t1p2_Name = localStorage.getItem('team1player2Name'),
		t2p1_Name = localStorage.getItem('team2player1Name'),
		t2p2_Name = localStorage.getItem('team2player2Name');
	team1player1Label.innerText = utils.truncateString(t1p1_Name, n);
	team1player2Label.innerText = utils.truncateString(t1p2_Name, n);
	team2player1Label.innerText = utils.truncateString(t2p1_Name, n);
	team2player2Label.innerText = utils.truncateString(t2p2_Name, n);
	scorecard_t1p1_name.innerText = utils.truncateString(t1p1_Name, n - 2);
	scorecard_t1p2_name.innerText = utils.truncateString(t1p2_Name, n - 2);
	scorecard_t2p1_name.innerText = utils.truncateString(t2p1_Name, n - 2);
	scorecard_t2p2_name.innerText = utils.truncateString(t2p2_Name, n - 2);
}

function validateNamesEntered() {
	if (team1player1NameInput.value === '') {
		team1player1NameInput.style.outline = '1px solid red'
		playerNameSubmitButton.disabled = true;
		nameCardValid = false;
	} else if (team1player2NameInput.value === '') {
		team1player2NameInput.style.outline = '1px solid red'
		playerNameSubmitButton.disabled = true;
		nameCardValid = false;
	} else if (team2player1NameInput.value === '') {
		team2player1NameInput.style.outline = '1px solid red'
		playerNameSubmitButton.disabled = true;
		nameCardValid = false;
	} else if (team2player2NameInput.value === '') {
		team2player2NameInput.style.outline = '1px solid red'
		playerNameSubmitButton.disabled = true;
		nameCardValid = false;
	} else {
		writeNamesLocal();
		writeNamesToEnterScores(8);
		playerNameInputCard.style.display = 'none';
		courseHoleSelectionCard.style.display = '';
	}
}
playerNameSubmitButton.addEventListener('click', validateNamesEntered);


function getSelectedCourse() {
	let selectedCourse = parseInt(courseDropdown.value);
	return selectedCourse;
}

function getSelectedHole() {
	let holeObject;
	let selectedHole = parseInt(holeDropdown.value);
	switch (getSelectedCourse()) {
		case 0:
			holeObject = courseInfo.deaconHoleInfo[selectedHole];
			break;
		case 1:
			holeObject = courseInfo.traditionalHoleInfo[selectedHole];
			break;
		case 2:
			holeObject = courseInfo.whitebirchHoleInfo[selectedHole];
			break;
	};
	return holeObject;
}

function validateCouseHole() {
	if (courseDropdown.value === '') {
	} else {
		courseHoleSubmitButton.disabled = false;
		courseHoleCardValid = true;
		getSelectedHole();
	}
}

function writeHoleInformation() {
	courseNameDisplay.innerText = getSelectedHole().courseString;
	holeNumberDisplay.innerText = getSelectedHole().hole;
	holeParDisplay.innerText = getSelectedHole().holePar;
	hdcpDisplay.innerText = getSelectedHole().holeHandicap;
	distanceDisplay.innerText = getSelectedHole().white;
}

function displayHoleSelected() {
	if (courseHoleCardValid) {
		writeHoleInformation();
		holeInfoCard.style.display = '';
		courseHoleSelectionCard.style.display = 'none';
		changeHoleButton.style.display = '';
		courseSelectForm.style.display = 'none';
		holeselectform.style.display = '';
		scoreEntryCard.style.display = '';
		showScorecardButton.style.display = '';
		let sh = getSelectedHole();
		let c = sh.courseID;
		let h = sh.hole - 1;
		let localCH = JSON.parse(localStorage.getItem(c + '-' + h));
		if (localCH !== null) {
			team1player1ScoreInput.value = localCH.t1p1Score;
			team1player2ScoreInput.value = localCH.t1p2Score;
			team2player1ScoreInput.value = localCH.t2p1Score;
			team2player2ScoreInput.value = localCH.t2p2Score;
		} else {
			team1player1ScoreInput.defaultValue = sh.holePar;
			team1player2ScoreInput.defaultValue = sh.holePar;
			team2player1ScoreInput.defaultValue = sh.holePar;
			team2player2ScoreInput.defaultValue = sh.holePar;
			team1player1ScoreInput.value = sh.holePar;
			team1player2ScoreInput.value = sh.holePar;
			team2player1ScoreInput.value = sh.holePar;
			team2player2ScoreInput.value = sh.holePar;
		};
	};
}

function changeHole() {
	holeInfoCard.style.display = 'none';
	changeHoleButton.style.display = 'none';
	courseHoleSelectionCard.style.display = '';
	scoreEntryCard.style.display = 'none';
}

courseDropdown.addEventListener('change', validateCouseHole);
holeDropdown.addEventListener('change', validateCouseHole);
courseHoleSubmitButton.addEventListener('click', displayHoleSelected);
changeHoleButton.addEventListener('click', changeHole);

//Add and Subtract Score Buttons
//Team1 Player 1
team1player1ScorePlusButton.addEventListener('click', function () {
	let p = parseInt(team1player1ScoreInput.value);
	if (p <= getSelectedHole().holePar + 2) {
		p++;
		team1player1ScoreInput.value = p;
	}
});
team1player1ScoreMinusButton.addEventListener('click', function () {
	let p = parseInt(team1player1ScoreInput.value);
	if (p > 1) {
		p--;
		team1player1ScoreInput.value = p;
	}
});
//Team1 Player 2
team1player2ScorePlusButton.addEventListener('click', function () {
	let p = parseInt(team1player2ScoreInput.value);
	if (p <= getSelectedHole().holePar + 2) {
		p++;
		team1player2ScoreInput.value = p;
	}
});
team1player2ScoreMinusButton.addEventListener('click', function () {
	let p = parseInt(team1player2ScoreInput.value);
	if (p > 1) {
		p--;
		team1player2ScoreInput.value = p;
	}
});
//Team2 Player 1
team2player1ScorePlusButton.addEventListener('click', function () {
	let p = parseInt(team2player1ScoreInput.value);
	if (p <= getSelectedHole().holePar + 2) {
		p++;
		team2player1ScoreInput.value = p;
	}
});
team2player1ScoreMinusButton.addEventListener('click', function () {
	let p = parseInt(team2player1ScoreInput.value);
	if (p > 1) {
		p--;
		team2player1ScoreInput.value = p;
	}
});
//Team2 Player 2
team2player2ScorePlusButton.addEventListener('click', function () {
	let p = parseInt(team2player2ScoreInput.value);
	if (p <= getSelectedHole().holePar + 2) {
		p++;
		team2player2ScoreInput.value = p;
	}
});
team2player2ScoreMinusButton.addEventListener('click', function () {
	let p = parseInt(team2player2ScoreInput.value);
	if (p > 1) {
		p--;
		team2player2ScoreInput.value = p;
	}
});
let roundInfo = [];

function calculateHole() {
	let par = getSelectedHole().holePar;
	let hole = getSelectedHole().hole;
	let courseID = getSelectedHole().courseID;
	let holeCourseID = courseID.toString() + '-' + holeDropdown.value.toString();
	let courseString = getSelectedHole().courseString;
	let t1p1Score = parseInt(team1player1ScoreInput.value);
	let t1p2Score = parseInt(team1player2ScoreInput.value);
	let t2p1Score = parseInt(team2player1ScoreInput.value);
	let t2p2Score = parseInt(team2player2ScoreInput.value);
	let team1Scores = [t1p1Score, t1p2Score];
	let team2Scores = [t2p1Score, t2p2Score];
	let modalHeaderText = '';
	if (t2p1Score < par || t2p2Score < par) {
		team1Scores.sort(function (a, b) { return b - a });
	} else {
		team1Scores.sort(function (a, b) { return a - b });
	};
	if (t1p1Score < par || t1p2Score < par) {
		team2Scores.sort(function (a, b) { return b - a });
	} else {
		team2Scores.sort(function (a, b) { return a - b });
	};
	var team1Vegas = parseInt(team1Scores[0].toString() + team1Scores[1].toString());
	var team2Vegas = parseInt(team2Scores[0].toString() + team2Scores[1].toString());
	let hole_winner;
	if (team1Vegas === team2Vegas) {
		hole_winner = 0;
		modalHeaderText = 'Hole was tied!'
		//holeOverallReportModal.innerText = 'Next hole will be worth double points!';
	} else if (team1Vegas > team2Vegas) {
		hole_winner = 2;
		modalHeaderText = localStorage.getItem('team2player1Name') + '/' + localStorage.getItem('team2player2Name') + ' win by ' + (team1Vegas - team2Vegas) + ' ' + utils.pointOrPoints(team1Vegas, team2Vegas);
		holeOverallReportModal.style.display = 'none';
	} else {
		hole_winner = 1;
		modalHeaderText = localStorage.getItem('team1player1Name') + '/' + localStorage.getItem('team1player2Name') + ' win by ' + (team2Vegas - team1Vegas) + ' ' + utils.pointOrPoints(team2Vegas, team1Vegas);
		holeOverallReportModal.style.display = 'none';
	};
	let holeResult = {
		courseID: courseID,
		courseString: courseString,
		holeNumber: hole,
		par: par,
		t1p1Score: t1p1Score,
		t1p2Score: t1p2Score,
		t2p1Score: t2p1Score,
		t2p2Score: t2p2Score,
		team1Vegas: team1Vegas,
		team2Vegas: team2Vegas,
		hole_winner,
		date: Date()
	}
	localStorage.setItem(holeCourseID, JSON.stringify(holeResult));
	roundInfo.push(holeResult);
	holeResultModalHeader.innerText = modalHeaderText;
	team1ScoreModalLabel.innerText = localStorage.getItem('team1player1Name') + '/' + localStorage.getItem('team1player2Name');
	team1ScoreDisplayModal.innerText = team1Vegas + ' points';
	team2ScoreModalLabel.innerText = localStorage.getItem('team2player1Name') + '/' + localStorage.getItem('team2player2Name');
	team2ScoreDisplayModal.innerText = team2Vegas + ' points';
	if (holeDropdown.value < 17) {
		completeRoundButton.style.display = 'none';
	} else {
		nextHoleButton.style.display = 'none';
	};
}
submitPageButton.addEventListener('click', calculateHole);


function goToNextHole() {
	if (playerNamesExist) {
		writeNamesToEnterScores(8);
		if (holeDropdown.value <= 16) {
			holeDropdown.value++;
		} else {
			console.log('error here, I should not see the go to nexthole button here')
		};
		getSelectedHole();
		displayHoleSelected();
		showScorecardButton.click();
	} else {
		playerNameInputCard.style.display = '';
	};
}

nextHoleButton.addEventListener('click', goToNextHole);

//****************************************ScoreCard************************************/
let t1p1h1 = document.getElementById('t1p1h1'),
	t1p2h1 = document.getElementById('t1p2h1'),
	t2p1h1 = document.getElementById('t2p1h1'),
	t2p2h1 = document.getElementById('t2p2h1'),
	t1p1h2 = document.getElementById('t1p1h2'),
	t1p2h2 = document.getElementById('t1p2h2'),
	t2p1h2 = document.getElementById('t2p1h2'),
	t2p2h2 = document.getElementById('t2p2h2'),
	t1p1h3 = document.getElementById('t1p1h3'),
	t1p2h3 = document.getElementById('t1p2h3'),
	t2p1h3 = document.getElementById('t2p1h3'),
	t2p2h3 = document.getElementById('t2p2h3'),
	t1p1h4 = document.getElementById('t1p1h4'),
	t1p2h4 = document.getElementById('t1p2h4'),
	t2p1h4 = document.getElementById('t2p1h4'),
	t2p2h4 = document.getElementById('t2p2h4'),
	t1p1h5 = document.getElementById('t1p1h5'),
	t1p2h5 = document.getElementById('t1p2h5'),
	t2p1h5 = document.getElementById('t2p1h5'),
	t2p2h5 = document.getElementById('t2p2h5'),
	t1p1h6 = document.getElementById('t1p1h6'),
	t1p2h6 = document.getElementById('t1p2h6'),
	t2p1h6 = document.getElementById('t2p1h6'),
	t2p2h6 = document.getElementById('t2p2h6'),
	t1p1h7 = document.getElementById('t1p1h7'),
	t1p2h7 = document.getElementById('t1p2h7'),
	t2p1h7 = document.getElementById('t2p1h7'),
	t2p2h7 = document.getElementById('t2p2h7'),
	t1p1h8 = document.getElementById('t1p1h8'),
	t1p2h8 = document.getElementById('t1p2h8'),
	t2p1h8 = document.getElementById('t2p1h8'),
	t2p2h8 = document.getElementById('t2p2h8'),
	t1p1h9 = document.getElementById('t1p1h9'),
	t1p2h9 = document.getElementById('t1p2h9'),
	t2p1h9 = document.getElementById('t2p1h9'),
	t2p2h9 = document.getElementById('t2p2h9'),
	t1p1h10 = document.getElementById('t1p1h10'),
	t1p2h10 = document.getElementById('t1p2h10'),
	t2p1h10 = document.getElementById('t2p1h10'),
	t2p2h10 = document.getElementById('t2p2h10'),
	t1p1h11 = document.getElementById('t1p1h11'),
	t1p2h11 = document.getElementById('t1p2h11'),
	t2p1h11 = document.getElementById('t2p1h11'),
	t2p2h11 = document.getElementById('t2p2h11'),
	t1p1h12 = document.getElementById('t1p1h12'),
	t1p2h12 = document.getElementById('t1p2h12'),
	t2p1h12 = document.getElementById('t2p1h12'),
	t2p2h12 = document.getElementById('t2p2h12'),
	t1p1h13 = document.getElementById('t1p1h13'),
	t1p2h13 = document.getElementById('t1p2h13'),
	t2p1h13 = document.getElementById('t2p1h13'),
	t2p2h13 = document.getElementById('t2p2h13'),
	t1p1h14 = document.getElementById('t1p1h14'),
	t1p2h14 = document.getElementById('t1p2h14'),
	t2p1h14 = document.getElementById('t2p1h14'),
	t2p2h14 = document.getElementById('t2p2h14'),
	t1p1h15 = document.getElementById('t1p1h15'),
	t1p2h15 = document.getElementById('t1p2h15'),
	t2p1h15 = document.getElementById('t2p1h15'),
	t2p2h15 = document.getElementById('t2p2h15'),
	t1p1h16 = document.getElementById('t1p1h16'),
	t1p2h16 = document.getElementById('t1p2h16'),
	t2p1h16 = document.getElementById('t2p1h16'),
	t2p2h16 = document.getElementById('t2p2h16'),
	t1p1h17 = document.getElementById('t1p1h17'),
	t1p2h17 = document.getElementById('t1p2h17'),
	t2p1h17 = document.getElementById('t2p1h17'),
	t2p2h17 = document.getElementById('t2p2h17'),
	t1p1h18 = document.getElementById('t1p1h18'),
	t1p2h18 = document.getElementById('t1p2h18'),
	t2p1h18 = document.getElementById('t2p1h18'),
	t2p2h18 = document.getElementById('t2p2h18'),
	t1p1Sum = document.getElementById('t1p1Sum'),
	t1p2Sum = document.getElementById('t1p2Sum'),
	t2p1Sum = document.getElementById('t2p1Sum'),
	t2p2Sum = document.getElementById('t2p2Sum'),
	score_Game_Toggle = document.getElementById('scorecard-gamecard-toggle'),
	scorecard_collapse = document.getElementById('scorecard_collapse'),
	gamecard_collapse = document.getElementById('gamecard_collapse'),
	gamecardTeam1Name = document.getElementById('gamecard-team1-name'),
	gamecardTeam2Name = document.getElementById('gamecard-team2-name'),
	gamecardTeam1Hole1 = document.getElementById('gamecard-team1-hole1'),
	gamecardTeam2Hole1 = document.getElementById('gamecard-team2-hole1'),
	gamecardTeam1Hole2 = document.getElementById('gamecard-team1-hole2'),
	gamecardTeam2Hole2 = document.getElementById('gamecard-team2-hole2'),
	gamecardTeam1Hole3 = document.getElementById('gamecard-team1-hole3'),
	gamecardTeam2Hole3 = document.getElementById('gamecard-team2-hole3'),
	gamecardTeam1Hole4 = document.getElementById('gamecard-team1-hole4'),
	gamecardTeam2Hole4 = document.getElementById('gamecard-team2-hole4'),
	gamecardTeam1Hole5 = document.getElementById('gamecard-team1-hole5'),
	gamecardTeam2Hole5 = document.getElementById('gamecard-team2-hole5'),
	gamecardTeam1Hole6 = document.getElementById('gamecard-team1-hole6'),
	gamecardTeam2Hole6 = document.getElementById('gamecard-team2-hole6'),
	gamecardTeam1Hole7 = document.getElementById('gamecard-team1-hole7'),
	gamecardTeam2Hole7 = document.getElementById('gamecard-team2-hole7'),
	gamecardTeam1Hole8 = document.getElementById('gamecard-team1-hole8'),
	gamecardTeam2Hole8 = document.getElementById('gamecard-team2-hole8'),
	gamecardTeam1Hole9 = document.getElementById('gamecard-team1-hole9'),
	gamecardTeam2Hole9 = document.getElementById('gamecard-team2-hole9'),
	gamecardTeam1Hole10 = document.getElementById('gamecard-team1-hole10'),
	gamecardTeam2Hole10 = document.getElementById('gamecard-team2-hole10'),
	gamecardTeam1Hole11 = document.getElementById('gamecard-team1-hole11'),
	gamecardTeam2Hole11 = document.getElementById('gamecard-team2-hole11'),
	gamecardTeam1Hole12 = document.getElementById('gamecard-team1-hole12'),
	gamecardTeam2Hole12 = document.getElementById('gamecard-team2-hole12'),
	gamecardTeam1Hole13 = document.getElementById('gamecard-team1-hole13'),
	gamecardTeam2Hole13 = document.getElementById('gamecard-team2-hole13'),
	gamecardTeam1Hole14 = document.getElementById('gamecard-team1-hole14'),
	gamecardTeam2Hole14 = document.getElementById('gamecard-team2-hole14'),
	gamecardTeam1Hole15 = document.getElementById('gamecard-team1-hole15'),
	gamecardTeam2Hole15 = document.getElementById('gamecard-team2-hole15'),
	gamecardTeam1Hole16 = document.getElementById('gamecard-team1-hole16'),
	gamecardTeam2Hole16 = document.getElementById('gamecard-team2-hole16'),
	gamecardTeam1Hole17 = document.getElementById('gamecard-team1-hole17'),
	gamecardTeam2Hole17 = document.getElementById('gamecard-team2-hole17'),
	gamecardTeam1Hole18 = document.getElementById('gamecard-team1-hole18'),
	gamecardTeam2Hole18 = document.getElementById('gamecard-team2-hole18'),
	gamecardTeam1Overall = document.getElementById('gamecard-team1-overall'),
	gamecardTeam2Overall = document.getElementById('gamecard-team2-overall');

//Gamecard v. Scorecard Button
score_Game_Toggle.innerText = 'Show Gamecard';
score_Game_Toggle.classList.add('btn-secondary');
function toggleButtonText() {
	if (scorecard_collapse.classList.contains('show')) {
		score_Game_Toggle.innerText = 'Show Scorecard';
		score_Game_Toggle.classList.remove('btn-secondary');
		score_Game_Toggle.classList.add('btn-primary');
	} else {
		score_Game_Toggle.innerText = 'Show Gamecard';
		score_Game_Toggle.classList.remove('btn-primary');
		score_Game_Toggle.classList.add('btn-secondary');
	};
}

document.getElementById('scorecard-gamecard-toggle').addEventListener('click',toggleButtonText);

function styleScorecard(par, score, scorecardID, total, sum) {
	switch (score - par) {
		case 3:
		case 2:
			scorecardID.classList.add("double-bogey");
			scorecardID.classList.remove('bogey', 'par', 'birdie', 'under-birdie');
			break;
		case 1:
			scorecardID.classList.add("bogey");
			scorecardID.classList.remove('double-bogey', 'par', 'birdie', 'under-birdie');
			break;
		case 0:
			scorecardID.classList.add("par");
			scorecardID.classList.remove('double-bogey', 'bogey', 'birdie', 'under-birdie');
			break;
		case -1:
			scorecardID.classList.add("birdie");
			scorecardID.classList.remove('double-bogey', 'bogey', 'par', 'under-birdie');
			break;
		case -2:
		case -3:
		case -4:
		case -5:
			scorecardID.classList.add("under-birdie");
			scorecardID.classList.remove('double-bogey', 'bogey', 'par', 'birdie');
			break;
	};
	scorecardID.innerText = score;
	total.push(score);
	let totes = total.reduce(function (a, b) {
		return a + b;
	}, 0);
	sum.innerText = totes;
}

function styleGameCard(hole, team1, team2, team1GameTotal, team2GameTotal, team1GameSum, team2GameSum) {
	if (hole.team1Vegas === hole.team2Vegas) {
		team1.innerText = "--";
		team2.innerText = "--";
		team1GameTotal.push(0);
		team2GameTotal.push(0);
	} else if (hole.team1Vegas > hole.team2Vegas) {
		team1.innerText = '+' + (hole.team1Vegas - hole.team2Vegas);
		team1GameTotal.push(hole.team1Vegas - hole.team2Vegas);
		team2.innerText = "Winner";
		team2GameTotal.push(0);
	} else if (hole.team2Vegas > hole.team1Vegas) {
		team1.innerText = "Winner";
		team1GameTotal.push(0);
		team2.innerText = '+' + (hole.team2Vegas - hole.team1Vegas);
		team2GameTotal.push(hole.team2Vegas - hole.team1Vegas);
	};
	let totes1 = team1GameTotal.reduce(function (a, b) {
		return a + b;
	}, 0);
	team1GameSum.innerText = totes1;
	let totes2 = team2GameTotal.reduce(function (a, b) {
		return a + b;
	}, 0);
	team2GameSum.innerText = totes2;
}

function writeScorecard() {
	gamecardTeam1Name.innerHTML = localStorage.getItem('team1player1Name') + '/' + localStorage.getItem('team1player2Name');
	gamecardTeam2Name.innerHTML = localStorage.getItem('team2player1Name') + '/' + localStorage.getItem('team2player2Name');
	let t1p1Total = [];
	let t1p2Total = [];
	let t2p1Total = [];
	let t2p2Total = [];
	let t1GameTotal = [];
	let t2GameTotal = [];
	let c = getSelectedHole().courseID;
	let hole_1 = JSON.parse(localStorage.getItem(c + '-0'));
	let hole_2 = JSON.parse(localStorage.getItem(c + '-1'));
	let hole_3 = JSON.parse(localStorage.getItem(c + '-2'));
	let hole_4 = JSON.parse(localStorage.getItem(c + '-3'));
	let hole_5 = JSON.parse(localStorage.getItem(c + '-4'));
	let hole_6 = JSON.parse(localStorage.getItem(c + '-5'));
	let hole_7 = JSON.parse(localStorage.getItem(c + '-6'));
	let hole_8 = JSON.parse(localStorage.getItem(c + '-7'));
	let hole_9 = JSON.parse(localStorage.getItem(c + '-8'));
	let hole_10 = JSON.parse(localStorage.getItem(c + '-9'));
	let hole_11 = JSON.parse(localStorage.getItem(c + '-10'));
	let hole_12 = JSON.parse(localStorage.getItem(c + '-11'));
	let hole_13 = JSON.parse(localStorage.getItem(c + '-12'));
	let hole_14 = JSON.parse(localStorage.getItem(c + '-13'));
	let hole_15 = JSON.parse(localStorage.getItem(c + '-14'));
	let hole_16 = JSON.parse(localStorage.getItem(c + '-15'));
	let hole_17 = JSON.parse(localStorage.getItem(c + '-16'));
	let hole_18 = JSON.parse(localStorage.getItem(c + '-17'));
	if (hole_1 !== null) {
		styleScorecard(hole_1.par, hole_1.t1p1Score, t1p1h1, t1p1Total, t1p1Sum);
		styleScorecard(hole_1.par, hole_1.t1p2Score, t1p2h1, t1p2Total, t1p2Sum);
		styleScorecard(hole_1.par, hole_1.t2p1Score, t2p1h1, t2p1Total, t2p1Sum);
		styleScorecard(hole_1.par, hole_1.t2p2Score, t2p2h1, t2p2Total, t2p2Sum);
		styleGameCard(hole_1, gamecardTeam1Hole1, gamecardTeam2Hole1, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_2 !== null) {
		styleScorecard(hole_2.par, hole_2.t1p1Score, t1p1h2, t1p1Total, t1p1Sum);
		styleScorecard(hole_2.par, hole_2.t1p2Score, t1p2h2, t1p2Total, t1p2Sum);
		styleScorecard(hole_2.par, hole_2.t2p1Score, t2p1h2, t2p1Total, t2p1Sum);
		styleScorecard(hole_2.par, hole_2.t2p2Score, t2p2h2, t2p2Total, t2p2Sum);
		styleGameCard(hole_2, gamecardTeam1Hole2, gamecardTeam2Hole2, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_3 !== null) {
		styleScorecard(hole_3.par, hole_3.t1p1Score, t1p1h3, t1p1Total, t1p1Sum);
		styleScorecard(hole_3.par, hole_3.t1p2Score, t1p2h3, t1p2Total, t1p2Sum);
		styleScorecard(hole_3.par, hole_3.t2p1Score, t2p1h3, t2p1Total, t2p1Sum);
		styleScorecard(hole_3.par, hole_3.t2p2Score, t2p2h3, t2p2Total, t2p2Sum);
		styleGameCard(hole_3, gamecardTeam1Hole3, gamecardTeam2Hole3, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_4 !== null) {
		styleScorecard(hole_4.par, hole_4.t1p1Score, t1p1h4, t1p1Total, t1p1Sum);
		styleScorecard(hole_4.par, hole_4.t1p2Score, t1p2h4, t1p2Total, t1p2Sum);
		styleScorecard(hole_4.par, hole_4.t2p1Score, t2p1h4, t2p1Total, t2p1Sum);
		styleScorecard(hole_4.par, hole_4.t2p2Score, t2p2h4, t2p2Total, t2p2Sum);
		styleGameCard(hole_4, gamecardTeam1Hole4, gamecardTeam2Hole4, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_5 !== null) {
		styleScorecard(hole_5.par, hole_5.t1p1Score, t1p1h5, t1p1Total, t1p1Sum);
		styleScorecard(hole_5.par, hole_5.t1p2Score, t1p2h5, t1p2Total, t1p2Sum);
		styleScorecard(hole_5.par, hole_5.t2p1Score, t2p1h5, t2p1Total, t2p1Sum);
		styleScorecard(hole_5.par, hole_5.t2p2Score, t2p2h5, t2p2Total, t2p2Sum);
		styleGameCard(hole_5, gamecardTeam1Hole5, gamecardTeam2Hole5, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_6 !== null) {
		styleScorecard(hole_6.par, hole_6.t1p1Score, t1p1h6, t1p1Total, t1p1Sum);
		styleScorecard(hole_6.par, hole_6.t1p2Score, t1p2h6, t1p2Total, t1p2Sum);
		styleScorecard(hole_6.par, hole_6.t2p1Score, t2p1h6, t2p1Total, t2p1Sum);
		styleScorecard(hole_6.par, hole_6.t2p2Score, t2p2h6, t2p2Total, t2p2Sum);
		styleGameCard(hole_6, gamecardTeam1Hole6, gamecardTeam2Hole6, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_7 !== null) {
		styleScorecard(hole_7.par, hole_7.t1p1Score, t1p1h7, t1p1Total, t1p1Sum);
		styleScorecard(hole_7.par, hole_7.t1p2Score, t1p2h7, t1p2Total, t1p2Sum);
		styleScorecard(hole_7.par, hole_7.t2p1Score, t2p1h7, t2p1Total, t2p1Sum);
		styleScorecard(hole_7.par, hole_7.t2p2Score, t2p2h7, t2p2Total, t2p2Sum);
		styleGameCard(hole_7, gamecardTeam1Hole7, gamecardTeam2Hole7, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_8 !== null) {
		styleScorecard(hole_8.par, hole_8.t1p1Score, t1p1h8, t1p1Total, t1p1Sum);
		styleScorecard(hole_8.par, hole_8.t1p2Score, t1p2h8, t1p2Total, t1p2Sum);
		styleScorecard(hole_8.par, hole_8.t2p1Score, t2p1h8, t2p1Total, t2p1Sum);
		styleScorecard(hole_8.par, hole_8.t2p2Score, t2p2h8, t2p2Total, t2p2Sum);
		styleGameCard(hole_8, gamecardTeam1Hole8, gamecardTeam2Hole8, t1GameTotal,t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_9 !== null) {
		styleScorecard(hole_9.par, hole_9.t1p1Score, t1p1h9, t1p1Total, t1p1Sum);
		styleScorecard(hole_9.par, hole_9.t1p2Score, t1p2h9, t1p2Total, t1p2Sum);
		styleScorecard(hole_9.par, hole_9.t2p1Score, t2p1h9, t2p1Total, t2p1Sum);
		styleScorecard(hole_9.par, hole_9.t2p2Score, t2p2h9, t2p2Total, t2p2Sum);
		styleGameCard(hole_9, gamecardTeam1Hole9, gamecardTeam2Hole9, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_10 !== null) {
		styleScorecard(hole_10.par, hole_10.t1p1Score, t1p1h10, t1p1Total, t1p1Sum);
		styleScorecard(hole_10.par, hole_10.t1p2Score, t1p2h10, t1p2Total, t1p2Sum);
		styleScorecard(hole_10.par, hole_10.t2p1Score, t2p1h10, t2p1Total, t2p1Sum);
		styleScorecard(hole_10.par, hole_10.t2p2Score, t2p2h10, t2p2Total, t2p2Sum);
		styleGameCard(hole_10, gamecardTeam1Hole10, gamecardTeam2Hole10, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_11 !== null) {
		styleScorecard(hole_11.par, hole_11.t1p1Score, t1p1h11, t1p1Total, t1p1Sum);
		styleScorecard(hole_11.par, hole_11.t1p2Score, t1p2h11, t1p2Total, t1p2Sum);
		styleScorecard(hole_11.par, hole_11.t2p1Score, t2p1h11, t2p1Total, t2p1Sum);
		styleScorecard(hole_11.par, hole_11.t2p2Score, t2p2h11, t2p2Total, t2p2Sum);
		styleGameCard(hole_11, gamecardTeam1Hole11, gamecardTeam2Hole11, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_12 !== null) {
		styleScorecard(hole_12.par, hole_12.t1p1Score, t1p1h12, t1p1Total, t1p1Sum);
		styleScorecard(hole_12.par, hole_12.t1p2Score, t1p2h12, t1p2Total, t1p2Sum);
		styleScorecard(hole_12.par, hole_12.t2p1Score, t2p1h12, t2p1Total, t2p1Sum);
		styleScorecard(hole_12.par, hole_12.t2p2Score, t2p2h12, t2p2Total, t2p2Sum);
		styleGameCard(hole_12, gamecardTeam1Hole12, gamecardTeam2Hole12, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_13 !== null) {
		styleScorecard(hole_13.par, hole_13.t1p1Score, t1p1h13, t1p1Total, t1p1Sum);
		styleScorecard(hole_13.par, hole_13.t1p2Score, t1p2h13, t1p2Total, t1p2Sum);
		styleScorecard(hole_13.par, hole_13.t2p1Score, t2p1h13, t2p1Total, t2p1Sum);
		styleScorecard(hole_13.par, hole_13.t2p2Score, t2p2h13, t2p2Total, t2p2Sum);
		styleGameCard(hole_13, gamecardTeam1Hole13, gamecardTeam2Hole13, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_14 !== null) {
		styleScorecard(hole_14.par, hole_14.t1p1Score, t1p1h14, t1p1Total, t1p1Sum);
		styleScorecard(hole_14.par, hole_14.t1p2Score, t1p2h14, t1p2Total, t1p2Sum);
		styleScorecard(hole_14.par, hole_14.t2p1Score, t2p1h14, t2p1Total, t2p1Sum);
		styleScorecard(hole_14.par, hole_14.t2p2Score, t2p2h14, t2p2Total, t2p2Sum);
		styleGameCard(hole_14, gamecardTeam1Hole14, gamecardTeam2Hole14, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_15 !== null) {
		styleScorecard(hole_15.par, hole_15.t1p1Score, t1p1h15, t1p1Total, t1p1Sum);
		styleScorecard(hole_15.par, hole_15.t1p2Score, t1p2h15, t1p2Total, t1p2Sum);
		styleScorecard(hole_15.par, hole_15.t2p1Score, t2p1h15, t2p1Total, t2p1Sum);
		styleScorecard(hole_15.par, hole_15.t2p2Score, t2p2h15, t2p2Total, t2p2Sum);
		styleGameCard(hole_15, gamecardTeam1Hole15, gamecardTeam2Hole15, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_16 !== null) {
		styleScorecard(hole_16.par, hole_16.t1p1Score, t1p1h16, t1p1Total, t1p1Sum);
		styleScorecard(hole_16.par, hole_16.t1p2Score, t1p2h16, t1p2Total, t1p2Sum);
		styleScorecard(hole_16.par, hole_16.t2p1Score, t2p1h16, t2p1Total, t2p1Sum);
		styleScorecard(hole_16.par, hole_16.t2p2Score, t2p2h16, t2p2Total, t2p2Sum);
		styleGameCard(hole_16, gamecardTeam1Hole16, gamecardTeam2Hole16, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_17 !== null) {
		styleScorecard(hole_17.par, hole_17.t1p1Score, t1p1h17, t1p1Total, t1p1Sum);
		styleScorecard(hole_17.par, hole_17.t1p2Score, t1p2h17, t1p2Total, t1p2Sum);
		styleScorecard(hole_17.par, hole_17.t2p1Score, t2p1h17, t2p1Total, t2p1Sum);
		styleScorecard(hole_17.par, hole_17.t2p2Score, t2p2h17, t2p2Total, t2p2Sum);
		styleGameCard(hole_17, gamecardTeam1Hole17, gamecardTeam2Hole17, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
	if (hole_18 !== null) {
		styleScorecard(hole_18.par, hole_18.t1p1Score, t1p1h18, t1p1Total, t1p1Sum);
		styleScorecard(hole_18.par, hole_18.t1p2Score, t1p2h18, t1p2Total, t1p2Sum);
		styleScorecard(hole_18.par, hole_18.t2p1Score, t2p1h18, t2p1Total, t2p1Sum);
		styleScorecard(hole_18.par, hole_18.t2p2Score, t2p2h18, t2p2Total, t2p2Sum);
		styleGameCard(hole_18, gamecardTeam1Hole18, gamecardTeam2Hole18, t1GameTotal, t2GameTotal, gamecardTeam1Overall, gamecardTeam2Overall);
	};
}
showScorecardButton.addEventListener('click', writeScorecard);


//
//
//Adding in a beta mode so that I don't have to go throught the whole thing everytime****************
function resetAll() {
	localStorage.clear();
}

const betaButton = document.getElementById('skip-ahead');
betaButton.addEventListener('click', function () {
	resetAll();
	document.getElementById('team1player1Name-input').value = 'Jake';
	document.getElementById('team1player2Name-input').value = 'Luke';
	document.getElementById('team2player1Name-input').value = 'Matt';
	document.getElementById('team2player2Name-input').value = 'Schneider';
	validateNamesEntered();
	playerNameInputCard.style.display = '';
	courseDropdown.value = '0';
	validateCouseHole();
	displayHoleSelected();
	betaButton.style.display = '';
	scoreEntryCard.style.display = '';
	holeInfoCard.style.display = '';
	changeHoleButton.style.display = '';
	courseHoleSelectionCard.style.display = '';
});
//End of BETA MODE***********************************************************************************