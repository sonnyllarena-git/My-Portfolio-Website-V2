import ClassicTemplate from './ClassicTemplate.jsx'
import OfficeAssistantTemplate from './OfficeAssistantTemplate.jsx'
import EngineerSidebarTemplate from './EngineerSidebarTemplate.jsx'
import SalesSidebarTemplate from './SalesSidebarTemplate.jsx'

export const RESUME_TEMPLATES = {
  classic: { label: 'Classic', component: ClassicTemplate },
  'office-assistant': {
    label: 'Office Assistant',
    component: OfficeAssistantTemplate,
  },
  'engineer-sidebar': {
    label: 'Engineer Sidebar',
    component: EngineerSidebarTemplate,
  },
  'sales-sidebar': {
    label: 'Sales Sidebar',
    component: SalesSidebarTemplate,
  },
}
