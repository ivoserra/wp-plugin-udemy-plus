import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps , InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, ColorPalette } from '@wordpress/components';
import block from './block.json';
import icons from '../../icons'
import './main.css';


registerBlockType(block.name, {
  icon: icons.primary,
  edit({ attributes, setAttributes }) {
    console.log(block.name)
    // console.log(attributes);
    const { content, underline_color } = attributes;
    const blockProps = useBlockProps();

    //console.log(blockProps);

    // the blockprops element should be always applied to the root element
    // we dont apply a class name as we did in the save function because the classes conflict with the wp_guttenburg classes 
    // structure and therefore in our editor our elemnets is correctly positioned

    return (
        <>
        <InspectorControls>
            <PanelBody title={__('Colors', 'udemy-plus')}>
                <ColorPalette
                    colors={[
                        { name: 'Red', color: '#f87171' },
                        { name: 'Indigo', color: '#818cf8' },
                    ]}
                    value={underline_color}
                    onChange={newValue => setAttributes({ underline_color: newValue })}
                />
            </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
            <RichText
            className="fancy-header"
            tagName="h2"
            placeholder={__("Enter Heading", "udemy-plus")}
            value={content}
            onChange={ newVal => setAttributes({ content: newVal })}
            allowedFormats={["core/bold", "core/italic"]}
            />
        </div>
      </>
    );
  },

  save({ attributes }) {
    // console.log(attributes);
    const { content, underline_color } = attributes;
    
    const blockProps = useBlockProps.save({
      className: 'fancy-header',
      style: {
        'background-image': `
            linear-gradient(transparent, transparent),
            linear-gradient(${underline_color}, ${underline_color});
        `
      }
    });

    return <RichText.Content {...blockProps} tagName="h2" value={content} />;
  },
});