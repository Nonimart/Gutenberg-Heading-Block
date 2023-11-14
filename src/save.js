import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { title, headingLevel, hasIcon, iconName } = attributes;
	return (
		<>
			<RichText.Content
				tagName={headingLevel}
				value={title}
				{...useBlockProps.save({
					className: `homegrade-blocks-custom-heading ${
						hasIcon ? "has-icon has-icon--" + iconName : ""
					}`,
				})}
			/>
		</>
	);
}
