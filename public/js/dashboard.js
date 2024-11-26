import { Score } from "./score.js";
import { VITE_BASE_URL } from "../../config.js";

const token = localStorage.getItem("authToken");

const rankPair = new Score(VITE_BASE_URL, token, 'pair');
const rankMine = new Score(VITE_BASE_URL, token, 'mine');

const ePair = document.getElementById('pair_score');
const eMine = document.getElementById('mine_score'); 

rankPair.pintarUsername(ePair, 3);
rankMine.pintarUsername(eMine, 3);

