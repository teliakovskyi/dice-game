import './App.css';
import './Button.css';
import React, { useState } from 'react';
import { INIT_STATE, MAX_SCORE } from '../helpers/config';
import Button from './Button';
import Players from './Players';

const App = () => {
	const [players, setPlayers] = React.useState(INIT_STATE);
	const [dice, setDice] = React.useState(0);
	const [game, setGame] = React.useState(false);

	const onResetClick = () => {
		setPlayers(INIT_STATE);
		setGame(true);
	};

	const onRollClick = () => {
		if (!game) return;
		// 1. Creating new
		let currentPlayers;
		// 1. Generating a random dice roll
		const score = Math.floor(Math.random() * 6) + 1;
		setDice(score);
		// 2. Check for rolled 1
		if (score !== 1) {
			// 3. If true
			currentPlayers = players.map((player) => {
				if (player.isActive) {
					return {
						...player,
						current: player.current + score,
					};
				}
				return player;
			});
		} else {
			// Switch to next player
			currentPlayers = players.map((player) => {
				return {
					...player,
					current: 0,
					isActive: !player.isActive,
				};
			});
		}
		setPlayers(currentPlayers);
	};

	const onHoldClick = () => {
		if (players.find((player) => player.isWinner)) return;

		let currentPlayers = players.map((player) => {
			if (player.isActive) {
				return {
					...player,
					score: player.score + player.current,
					current: 0,
					isActive: !player.isActive,
				};
			}
			return {
				...player,
				current: 0,
				isActive: !player.isActive,
			};
		});

		currentPlayers = currentPlayers.map((player) => {
			if (player.score >= MAX_SCORE) {
				setGame(!game);
				return {
					...player,
					name: 'WINNER!',
					isWinner: !player.isWinner,
				};
			}
			return player;
		});
		console.log(currentPlayers);
		setPlayers(currentPlayers);
	};

	return (
		<div className='game'>
			<Players players={players} />
			<Button className='btn btn--new' onClick={onResetClick}>
				🔄 New game
			</Button>
			<Button className='btn btn--roll' onClick={onRollClick}>
				🎲 Roll dice
			</Button>
			<Button className='btn btn--hold' onClick={onHoldClick}>
				📥 Hold
			</Button>
		</div>
	);
};

export default App;
