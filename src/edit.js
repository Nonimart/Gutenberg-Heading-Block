import { __ } from "@wordpress/i18n";
import "./editor.scss";

import { createBlock } from "@wordpress/blocks";
import { dispatch, useSelect } from "@wordpress/data";
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";

import {
	ToggleControl,
	PanelBody,
	KeyboardShortcuts,
	ToolbarGroup,
	ToolbarButton,
} from "@wordpress/components";

import { headingLevel3, headingLevel4, headingLevel5 } from "@wordpress/icons";

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	...blockProps
}) {
	const { title, headingLevel, hasIcon, iconName } = attributes;

	const blockIndex = useSelect((select) => {
		const { getBlockIndex } = select("core/block-editor");
		return getBlockIndex(clientId);
	});

	function onChangeTitle(newTitle) {
		setAttributes({ title: newTitle });
	}
	function onChangeHeadingLevel(newHeadingLevel) {
		setAttributes({ headingLevel: newHeadingLevel });
	}
	function handleIconChange(newIconName) {
		setAttributes({ iconName: newIconName });
	}
	function onHasIconChange(hasIconToggleValue) {
		setAttributes({
			hasIcon: hasIconToggleValue,
		});
	}
	function insertParagraphOnEnter(e) {
		const newBlock = createBlock("core/paragraph", {});
		dispatch("core/block-editor").insertBlocks(newBlock, blockIndex + 1);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Icone", "homegrade-blocks__texte-backoffice")}
					initialOpen={true}
				>
					<ToggleControl
						label="Afficher un icone"
						checked={hasIcon}
						onChange={onHasIconChange}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isActive={headingLevel === "h3"}
						icon={headingLevel3}
						onClick={() => {
							onChangeHeadingLevel("h3");
						}}
					/>
					<ToolbarButton
						isActive={headingLevel === "h4"}
						icon={headingLevel4}
						onClick={() => {
							onChangeHeadingLevel("h4");
						}}
					/>
					<ToolbarButton
						isActive={headingLevel === "h5"}
						icon={headingLevel5}
						onClick={() => {
							onChangeHeadingLevel("h5");
						}}
					/>
				</ToolbarGroup>
				{hasIcon && (
					<ToolbarGroup>
						<ToolbarButton
							title={"Clé"}
							icon={"admin-network"}
							isActive={iconName === "key"}
							onClick={() => handleIconChange("key")}
						/>
						<ToolbarButton
							title={"Lien"}
							icon={"admin-links"}
							isActive={iconName === "chain"}
							onClick={() => handleIconChange("chain")}
						/>
						<ToolbarButton
							title={"Homegrade"}
							icon={"admin-home"}
							isActive={iconName === "house"}
							onClick={() => handleIconChange("house")}
						/>
						<ToolbarButton
							title={"Inspiration"}
							icon={"lightbulb"}
							isActive={iconName === "bulb"}
							onClick={() => handleIconChange("bulb")}
						/>
					</ToolbarGroup>
				)}
			</BlockControls>

			<KeyboardShortcuts
				shortcuts={{
					enter: (e) => insertParagraphOnEnter(e),
				}}
			>
				<RichText
					onChange={onChangeTitle}
					value={title}
					disableLineBreaks
					placeholder={__(
						"Insérez votre titre ici",
						"homegrade-blocks__texte-backoffice"
					)}
					allowedFormats={["homegrade-format/tooltip"]}
					tagName={headingLevel}
					{...useBlockProps({
						className: `homegrade-blocks-custom-heading ${
							hasIcon ? "has-icon has-icon--" + iconName : " "
						}`,
					})}
					style={{ backgroundImage: "red" }}
				/>
			</KeyboardShortcuts>
		</>
	);
}
