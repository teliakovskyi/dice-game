import React from 'react';
import Player from './Player';

const Players = ({ players }) => {
	const renderPlayers = players.map((player, index) => {
		return <Player key={index} player={player} />;
	});
	return <React.Fragment>{renderPlayers}</React.Fragment>;
};

export default Players;
