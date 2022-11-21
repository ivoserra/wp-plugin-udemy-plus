import { registerBlockType } from '@wordpress/blocks';
import icons from '../../icons.js';
import './main.css';
import edit from './edit.js';
import save from './save.js';

registerBlockType('udemy-plus/team-member', {
  icon: {
    src: icons.primary
  },
  edit,
  save
});