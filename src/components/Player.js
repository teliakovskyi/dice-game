import './Player.css';
import React from 'react';

const Player = ({ player }) => {
	return (
		<section
			className={`player ${player.isActive ? 'player--active' : ''} ${
				player.isWinner ? 'player--winner' : ''
			}`}>
			<h2 className='name'>{player.name}</h2>
			<p className='score'>{player.score}</p>
			<div className='current'>
				<p className='current-label'>Current</p>
				<p className='current-score'>{player.current}</p>
			</div>
		</section>
	);
};

export default Player;
