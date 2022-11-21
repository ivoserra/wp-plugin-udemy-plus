import { registerBlockType } from '@wordpress/blocks'
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { PanelBody, QueryControls } from '@wordpress/components'
import { useSelect } from '@wordpress/data'
import icons from '../../icons.js'
import './main.css'

registerBlockType('udemy-plus/popular-recipes', {
  icon: {
    src: icons.primary
  },
	edit({ attributes, setAttributes }) {
    const { title, count, cuisines } = attributes
    const blockProps = useBlockProps()

    const terms = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'cuisine', { per_page: -1 });

    });
    const suggestions = {};

    terms?.forEach(term => {
        suggestions[term.name] = term;
       
    });

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Settings', 'udemy-plus')}>
            <QueryControls 
            numberOfItems={count}
            minItems={1}
            maxItems={10}
            onNumberOfItemsChange={(count) => setAttributes({ count })}
            categorySuggestions={suggestions}
            onCategoryChange={(newTerms) => {
                const newCuisines = [];
                newTerms.forEach(cuisine => {

                    if(typeof cuisine === 'object') {
                        newCuisines.push(cuisine);
                    }

                    const cuisineTerm = terms?.find(term => term.name === cuisine);

                    if(cuisineTerm) {
                        newCuisines.push(cuisineTerm);
                    }
                    
                });
                setAttributes({ cuisines: newCuisines });

            }}
            selectedCategories={cuisines}
            />
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <RichText
            tagName="h6"
            value={ title }
            withoutInteractiveFormatting
            onChange={ title => setAttributes({ title }) }
            placeholder={ __('Title', 'udemy-plus') }
          />
          <div class="single-post">
            <a class="single-post-image" href="#">
              <img src="" alt="" />
            </a>
            <div class="single-post-detail">
              <a href="#">Example Title</a>
              <span>
                by <a href="#">John Doe</a>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
});