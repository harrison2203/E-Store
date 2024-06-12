import "./styles/globals.css";
import Nav from "../components/Nav";
import Nav2 from '../components/nav2';
import { Providers } from './providers';


export default function RootLayout({ children, index }) {
	const navBarList = [<Nav/>, <Nav2/>];
	const renderNavBar = (_index) => navBarList[_index];

  return (
    <html lang="en">
      <body>
				{renderNavBar(index)}
				<Providers>
					{children}
				</Providers>
			</body>
    </html>
  );
}
