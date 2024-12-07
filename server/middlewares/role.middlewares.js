export function requireRole(role) {
  return async (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

export async function requireDepartmentAccess(req, res, next) {
  if (
    req.user.role === "AssistantTeacher" &&
    req.user.department !== req.query.department
  ) {
    return res
      .status(403)
      .json({ message: "Access denied for this department" });
  }
  next();
}
