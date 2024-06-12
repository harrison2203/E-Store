"use client";
import React from 'react';
import UserAccountComponent from '../../../components/UserAccountComponent.jsx';
import DeleteUserComponent from '../../../components/DeleteUserComponent.jsx';
import UserProvider from '../../../context/UserContext.jsx';
import RootLayout from '../../layout';


export default function UserPage({params}) {
	const { id } = params;
	return (
		<div>
			<RootLayout index={1}>
				<UserProvider id={id}>
					<UserAccountComponent/>
				</UserProvider>
			</RootLayout>
		</div>
	)
}



