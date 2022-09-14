import type { FC } from "react";
import { CustomImage } from "@components/Utils/CustomImage";
import { useLocaleParser } from "@libs/localeParser";
import { CONFIG } from "@libs/config";

export const Stack: FC = () => {
	const parser = useLocaleParser();

	return (
		<section className="bg-white text-black dark:bg-gray-900 dark:text-white">
			<h1
				className="mb-10 text-center font-heading text-4xl font-semibold"
				dangerouslySetInnerHTML={{
					__html: parser.get("stack"),
				}}
			/>
			<div className="container mx-auto px-4">
				<div className="flex flex-col justify-center">
					<div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{CONFIG.STACKS.map((stack, idx) => (
							<div
								key={idx}
								className="flex items-center justify-around rounded-xl bg-gray-200 p-4 dark:bg-gray-800"
							>
								<CustomImage
									className="h-16 w-16"
									src={stack.icon}
									alt={stack.alt}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
