# Custom React Implementation with useState Hook

## Summary
This folder contains a minimal, custom implementation of React's core functionality built from scratch using vanilla JavaScript. The project demonstrates how React's virtual DOM and hooks work by creating a simplified version that can render components to the actual DOM and manage state.

## Features

- **Custom createElement**: Renders virtual DOM objects to actual DOM elements
- **Component-based architecture**: Supports functional components that return virtual DOM structures
- **Simple rendering system**: Mimics React's `createRoot().render()` pattern
- **Recursive element rendering**: Handles nested components and children arrays
- **useState Hook**: Complete implementation of React's useState hook with state management and re-rendering
- **Event handling**: Support for onClick and other event handlers
- **State persistence**: State is maintained across re-renders

## Files

- `index.html` - Basic HTML structure with a root div element
- `main.js` - Contains the custom React implementation with useState hook and sample App component
- `readme.md` - This documentation

## How it works

The implementation includes:
- A `createRoot()` function that creates a renderer
- A `renderElement()` function that recursively converts virtual DOM to real DOM with event handling
- A `useState()` hook that manages component state and triggers re-renders
- An example `App()` component that demonstrates useState with counter and message state

## useState Hook Usage

```javascript
function MyComponent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Hello");
  
  return {
    type: "div",
    props: {
      children: [
        {
          type: "p",
          props: { children: `Count: ${count}` }
        },
        {
          type: "button",
          props: {
            children: "Increment",
            onclick: () => setCount(count + 1)
          }
        }
      ]
    }
  };
}
```

## Features Demonstrated

- Multiple useState hooks in a single component
- State updates trigger automatic re-renders
- Event handlers (onClick) work with state setters
- State persistence across component re-renders
- Function-based state updates (like React)

This project demonstrates the fundamental concepts behind React's rendering engine and hooks system in a simplified form, making it easy to understand how React works under the hood.