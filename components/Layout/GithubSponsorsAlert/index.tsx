import type { FC } from "react";
import { useLocaleParser } from "@libs/localeParser";
import { Alert } from "@components/Utils/Alert";
import { CONFIG } from "@libs/config";
import { useLocalStorage } from "react-use";

export const GithubSponsorsAlert: FC = () => {
	const parser = useLocaleParser();

	const [check, setCheck] = useLocalStorage("github_sponsors_check", false);

	const handleClose = () => {
		setCheck(true);
		window.open(`https://github.com/sponsors/${CONFIG.GITHUB_USERNAME}`);
	};

	return (
		!check && (
			<Alert
				type="success"
				title={parser.get("github_sponsors_title")}
				onClose={handleClose}
				html={parser.get("github_sponsors_description", {
					link: `<a rel='noreferrer' target='_blank' href='https://github.com/sponsors/${CONFIG.GITHUB_USERNAME}' class='cursor-pointer hover:underline'>https://github.com/sponsors/${CONFIG.GITHUB_USERNAME}</a>`,
				})}
			></Alert>
		)
	);
};
