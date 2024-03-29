/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

import authService from './../../services/auth';

export default {
  data: () => ({
    aboutDialogVisible: false,
    supportDialogVisible: false
  }),
  methods: {
    logout() {
      authService.logout();
    }
  },
};
