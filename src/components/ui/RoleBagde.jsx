export default function getRoleBadge(role){
    
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Editor':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-emerald-100 text-emerald-800';
    }
    
}