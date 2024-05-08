import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

import PropTypes from 'prop-types';

const UserProvider = ({children}) => {
	const [sessionID, setSessionID] = useState(() => {
		const storedSessionID = localStorage.getItem("sessionID");
		return storedSessionID ? storedSessionID : null;
	});

	useEffect(() => {
		localStorage.setItem("sessionID", sessionID);
	}, [sessionID]);

	const updateSessionID = (newData) => {
		setSessionID(newData);
	};

	return (
		<UserContext.Provider
			value={{
				sessionID,
				updateSessionID,
			}}
		>
			{children}
		</UserContext.Provider>
	)
};

const useUser = () => {
	const user = useContext(UserContext);

	if (user == undefined) {
		throw new Error('UserContext can not be used outside UserProvider');
	}

	return user;
};

UserProvider.propTypes = {
	children: PropTypes.any,
};

export { useUser, UserProvider };