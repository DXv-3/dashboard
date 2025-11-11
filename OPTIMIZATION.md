# Synapse Platform UI - Performance Optimizations

This document outlines the performance optimizations implemented in the Synapse Platform UI to ensure a fast, responsive, and efficient user experience.

## Table of Contents
1. [Frontend Performance](#1-frontend-performance)
   - [1.1. Route-Based Code Splitting](#11-route-based-code-splitting)
   - [1.2. Component Memoization](#12-component-memoization)
   - [1.3. Recharts Performance](#13-recharts-performance)
   - [1.4. List Virtualization](#14-list-virtualization)
   - [1.5. Lazy Chart Rendering](#15-lazy-chart-rendering)
2. [Build Optimizations](#2-build-optimizations)
3. [State Management](#3-state-management)
4. [Data Fetching](#4-data-fetching)
5. [Code Quality & Monitoring](#5-code-quality--monitoring)
6. [API Optimizations](#6-api-optimizations)

---

## 1. Frontend Performance

### 1.1. Route-Based Code Splitting
- **Implementation**: View components (`IngestView`, `QueryView`, `DashboardView`) are now loaded using `React.lazy()`.
- **Benefit**: The initial JavaScript bundle is smaller, as the code for each view is only downloaded from the server when the user navigates to it for the first time. This significantly improves initial page load time. A `Suspense` component shows a loading spinner during the download.

### 1.2. Component Memoization
- **Implementation**:
  - `React.memo()`: Computationally-intensive components like `GraphVisualization` are wrapped in `React.memo()` to prevent re-renders if their props have not changed.
  - `useCallback()`: Event handlers and functions passed as props (e.g., in `IngestView`, `QueryView`) are wrapped in `useCallback()` to maintain their reference across renders.
- **Benefit**: Reduces the number of unnecessary re-renders, saving CPU cycles and making the UI feel more responsive.

### 1.3. Recharts Performance
- **Implementation**:
  - Animations are disabled on all charts (`isAnimationActive={false}`).
  - Dots are removed from dense line charts (`dot={false}`).
- **Benefit**: Disabling animations and simplifying chart elements dramatically speeds up the rendering and re-rendering of charts, especially on the data-heavy dashboard.

### 1.4. List Virtualization
- **Implementation**: The chat message list in `QueryView` now uses `react-window`.
- **Benefit**: For long lists, virtualization is critical. It ensures that only the list items currently visible in the viewport are rendered to the DOM. This keeps the application fast and responsive even with thousands of messages.

### 1.5. Lazy Chart Rendering
- **Implementation**: A `LazyChart` wrapper component uses the Intersection Observer API (via `react-intersection-observer`) to detect when a chart is visible.
- **Benefit**: Charts on the `DashboardView` are only rendered when they are scrolled into view. This avoids the expensive cost of rendering all charts on initial load.

## 2. Build Optimizations
- **Implementation**: A `vite.config.ts` has been configured with production-grade settings, including manual chunking for vendors, minification with Terser (to strip console logs), and a bundle size visualizer.
- **Benefit**: Creates smaller, more efficient production bundles, leading to faster load times for end-users.

## 3. State Management
- **Implementation**: Global UI state (like the current view and dashboard metrics) has been migrated from component local state (`useState`) to a centralized `zustand` store.
- **Benefit**: Decouples components, prevents "prop-drilling," and allows for more efficient, targeted re-renders when state changes, as components subscribe only to the state slices they need.

## 4. Data Fetching
- **Implementation**:
  - **Debouncing**: A `useDebouncedValue` hook has been added to the query input to delay API calls until the user has stopped typing.
  - **Error Boundaries**: The main application is wrapped in an `ErrorBoundary` component to catch runtime errors and display a fallback UI instead of a blank screen.
- **Benefit**: Reduces the number of API requests and prevents the entire application from crashing due to an error in a single component.

## 5. Code Quality & Monitoring
- **Implementation**: A `measureRender` utility function was created using the browser's Performance API.
- **Benefit**: In development mode, this utility logs the render times of key components to the console, allowing developers to easily spot and diagnose performance regressions.

## 6. API Optimizations
- **Implementation**: A simple in-memory cache has been added to the mock API service for agent queries.
- **Benefit**: Repeated queries return instantly from the cache, improving perceived performance and reducing backend load.
