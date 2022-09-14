import { type ChangeEvent, type FC, type FormEvent, useState } from "react";
import { useLocaleParser } from "@libs/localeParser";
import { Link } from "@components/Utils/Link";
import { toast } from "react-toastify";
import { CONFIG } from "@libs/config";

export const Contact: FC = () => {
	const parser = useLocaleParser();

	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [message, setMessage] = useState("");

	const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMail(e.target.value);
	};

	const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !mail || !message)
			return toast.error(parser.get("fill_form"));
		window.open(
			`mailto:${CONFIG.EMAIL}?body=${encodeURIComponent(
				`Hey, It's ${name} (${mail})\n\n${message}`,
			)}`,
		);
		toast.success(parser.get("form_sent"));
	};

	return (
		<section
			id="contact"
			className="bg-white py-10 px-4 text-black dark:bg-gray-900 dark:text-white"
		>
			<h1
				className="mb-10 text-center font-heading text-4xl font-semibold"
				dangerouslySetInnerHTML={{
					__html: parser.get("contact_me"),
				}}
			/>
			<div className="mx-auto mb-12 w-full max-w-2xl">
				<form onSubmit={onSubmit}>
					<div className="-mx-2 mb-4 flex">
						<div className="w-1/2 px-2">
							<input
								onChange={onMailChange}
								className="round block w-full appearance-none border border-gray-200 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
								type="email"
								placeholder={parser.get("email")}
							/>
						</div>
						<div className="w-1/2 px-2">
							<input
								onChange={onNameChange}
								className="round block w-full appearance-none border border-gray-200 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
								type="text"
								placeholder={parser.get("name")}
							/>
						</div>
					</div>
					<div className="mb-4">
						<textarea
							onChange={onMessageChange}
							className="round block w-full appearance-none border border-gray-200 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
							placeholder={parser.get("write_something")}
							rows={5}
						></textarea>
					</div>
					<div>
						<button
							aria-label="Submit"
							className="round inline-block w-full bg-purple-600 py-4 px-8 font-semibold leading-none text-white hover:bg-purple-700"
						>
							{parser.get("submit")}
						</button>
					</div>
				</form>
			</div>
			<div className="-mx-4 flex flex-col justify-center lg:flex-row">
				{CONFIG.CONTACT.map((social, idx) => (
					<Link
						underline
						key={idx}
						href={social.href}
						className="flex items-center px-4"
					>
						<social.icon className="mr-3 inline-block h-6 w-6 text-purple-600" />
						{social.value}
					</Link>
				))}
			</div>
		</section>
	);
};
