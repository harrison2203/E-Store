'use client';
import React from 'react';
import UpdateUserComponent from '../../../../components/UpdateUserComponent';
import UserProvider from '../../../../context/UserContext';

export default function EditUserPage({params}) {
	const { id } = params;
	console.log('idddd', id)
	return (
		<div>
			<h1>User Account!</h1>
			<UserProvider id={id}>
				<UpdateUserComponent id={id} />
			</UserProvider>
		</div>
	)
}