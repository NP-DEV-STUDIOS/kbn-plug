# CV Maker - Professional Resume Builder

A modern, beautiful, and fully decoupled React-based CV/Resume builder with professional templates, real-time preview, and PDF export capabilities.

## 🚀 Features

- **Beautiful UI**: Modern design with gradients, animations, and responsive layout
- **Decoupled Architecture**: Clean separation of concerns with custom hooks and context
- **Professional Templates**: Multiple resume templates (Modern, Classic, Creative, etc.)
- **Real-time Preview**: Live preview as you type
- **PDF Export**: High-quality PDF generation with proper formatting
- **Data Import/Export**: JSON-based data import and export functionality
- **Form Validation**: Comprehensive validation with user-friendly error messages
- **Responsive Design**: Fully responsive - mobile, tablet, and desktop optimized
- **Independent Scrolling**: Sidebar and preview sections scroll independently
- **TypeScript**: Fully typed for better developer experience

## 📱 Responsive Design

### Desktop Layout (lg breakpoint and above)
- **Left Sidebar**: Navigation sidebar (320px width) with desktop navigation tabs
- **Split View**: Form inputs on the left (40%), resume preview on the right (60%)
- **Independent Scrolling**: Both sections scroll independently without affecting the other

### Mobile & Tablet Layout (below lg breakpoint)
- **Horizontal Tab Navigation**: Mobile-friendly horizontal scroll tabs at the top
- **Stacked Layout**: Form inputs and preview stack vertically
- **Full Width**: Content takes full width on mobile for better usability
- **Optimized Heights**: Proper height calculations accounting for navbar

## 📁 Project Structure

```
cv-maker/
├── context/
│   └── resume-context.tsx          # Global state management
├── hooks/
│   ├── use-navigation.ts           # Navigation state management
│   ├── use-pdf-export.ts           # PDF export functionality
│   └── use-data-import-export.ts   # Data import/export logic
├── _components/
│   ├── ui/
│   │   └── sidebar.tsx             # Desktop navigation sidebar (hidden on mobile)
│   ├── forms/                      # Form components
│   │   ├── personal-info-form.tsx
│   │   ├── work-experience-form.tsx
│   │   ├── education-form.tsx
│   │   ├── skills-form.tsx
│   │   ├── references-form.tsx
│   │   └── personal-info-sidebar.tsx
│   ├── panels/                     # Feature panels
│   │   ├── guidance-panel.tsx
│   │   ├── analysis-panel.tsx
│   │   ├── matching-panel.tsx
│   │   ├── design-panel.tsx
│   │   └── cover-letter-panel.tsx
│   ├── templates/                  # Resume templates
│   │   ├── modern.tsx
│   │   ├── classic.tsx
│   │   ├── creative.tsx
│   │   ├── elegant.tsx
│   │   ├── minimal.tsx
│   │   └── tech.tsx
│   └── resume-preview.tsx          # Resume preview component
├── types.ts                        # TypeScript type definitions
├── page.tsx                        # Main application component
└── README.md                       # This file
```

## 🏗️ Architecture

### Context-Based State Management

The application uses React Context for global state management:

```tsx
// ResumeContext provides centralized access to resume data
const { resumeData, updateResumeSection, selectedTemplate } = useResume()
```

### Custom Hooks

- **`useNavigation`**: Manages tab and sidebar navigation state
- **`usePDFExport`**: Handles PDF generation and download with proper resizing
- **`useDataImportExport`**: Manages JSON data import/export with validation

### Component Organization

- **Forms**: Individual form components for each resume section
- **Panels**: Feature-specific panels (Guidance, Analysis, etc.)
- **Templates**: Resume layout templates with professional designs
- **UI**: Reusable UI components with responsive utilities

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (`from-blue-500 to-purple-600`)
- **Secondary**: Slate grays for UI elements
- **Accent**: Various colors for different sections (green, purple, orange, etc.)
- **Background**: Subtle gradients and glassmorphism effects

### Typography
- **Headings**: Bold, modern fonts with proper hierarchy
- **Body**: Clean, readable text with appropriate line heights
- **Interactive**: Hover states and transitions for better UX

### Responsive Breakpoints
- **Mobile** (< 1024px): Full-width stacked layout
- **Tablet** (768px - 1024px): Optimized touch targets
- **Desktop** (≥ 1024px): Split-view sidebar + content layout

## 🔧 Usage

### Basic Setup

```tsx
import { ResumeProvider } from './context/resume-context'
import ResumeBuilder from './page'

function App() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  )
}
```

### Using the Context

```tsx
import { useResume } from './context/resume-context'

function MyComponent() {
  const { resumeData, updateResumeSection } = useResume()

  const handleUpdate = (personalInfo) => {
    updateResumeSection('personalInfo', personalInfo)
  }

  return (
    // Component JSX
  )
}
```

### Adding New Templates

1. Create a new template component in `templates/`
2. Export it from the templates index
3. Add it to the template selector configuration

## 📝 API Reference

### ResumeContext

#### `resumeData: ResumeData`
Current resume data object containing all user information

#### `updateResumeSection(section, data)`
Updates a specific section of resume data with proper state management

#### `resetResumeData()`
Resets all resume data to initial empty state

#### `selectedTemplate: string`
Currently selected template ID

#### `setSelectedTemplate(template: string)`
Changes the selected template and updates preview

### Custom Hooks

#### `usePDFExport(resumeData, resumeRef)`
Returns: `{ exportPDF, isExporting }`
- Generates high-quality PDF with proper formatting
- Handles file download with user's name

#### `useDataImportExport(resumeData, setResumeData)`
Returns: `{ exportJSON, importJSON }`
- Exports resume as JSON file
- Imports JSON data with validation
- Handles file reading and error states

#### `useNavigation()`
Returns: `{ activeTab, activeSidebarSection, changeTab, changeSidebarSection, navigationTabs, sidebarSections }`
- Manages navigation tab state
- Handles sidebar section switching
- Provides configuration constants

## 🎯 Best Practices

### Code Organization
- Keep components focused on single responsibilities
- Use custom hooks for complex logic
- Maintain consistent naming conventions
- Add comprehensive JSDoc comments

### Performance
- React.memo for expensive components
- Proper key props for lists
- Lazy load heavy components when needed
- Optimize images and assets

### Accessibility
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast

### User Experience
- Immediate feedback for actions
- Loading states for async operations
- Proper error handling with toast notifications
- Helpful tooltips and guidance

## 📱 Mobile Responsiveness

The CV maker is fully responsive and optimized for all devices:

### Mobile Features
- **Touch-optimized buttons**: Larger hit targets for touch interactions
- **Horizontal scroll tabs**: Mobile-friendly navigation at the top
- **Stacked layout**: Form and preview stack vertically
- **Flexible typography**: Font sizes adjust for readability
- **Optimized spacing**: Proper padding for smaller screens

### Tablet Features
- **Balanced layout**: Optimized for medium-sized screens
- **Touch gestures**: Support for swipe and tap interactions
- **Readable typography**: Scaled appropriately for tablet size
- **Sensor-friendly**: Accounts for safe areas and notches

## 🚀 Deployment

The CV maker is designed to work within a Next.js application. Ensure all dependencies are installed:

```bash
npm install html2canvas jspdf lucide-react sonner
```

## 🤝 Contributing

When contributing to the CV maker:

1. Follow the established code style and patterns
2. Add proper TypeScript types
3. Include JSDoc comments for new functions
4. Test components across different screen sizes
5. Ensure accessibility compliance
6. Test on mobile and tablet devices

## 📄 License

This project is part of the CareerBlob application. See the main project license for details.