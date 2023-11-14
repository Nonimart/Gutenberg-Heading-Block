import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
	icon: {
		src: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M6.2 5.2v13.4l5.8-4.8 5.8 4.8V5.2z"></path>
			</svg>
		),
		foreground: "#DF1E1E",
	},
	__experimentalLabel(attributes, { context }) {
		const { title } = attributes;

		const customName = attributes?.metadata?.name;

		// In the list view, use the block's content as the label.
		// If the content is empty, fall back to the default label.
		if (context === "list-view" && (customName || title)) {
			return attributes?.metadata?.name || title;
		}
	},
	edit: Edit,
	save,
});
