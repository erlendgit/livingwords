# Frontend Philosophy

## frontend/src/components/\*

Only technical stuff goes here. No styling.

Components use widgets and plugins.

## frontend/src/layouts/\*

Root layout pages

Pages that share headers/sidebars/etc can use the same layout.

Layouts use widgets to build the UI.

## frontend/src/plugins/\*

React plugins that are used by components.

## frontend/src/widgets/\*

- Re-usable components to build the frontend with
- The only place in the project where you can find styling.
