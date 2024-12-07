export function requireRole(roles) {
  return (req, res, next) => {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role(s): ${allowedRoles.join(", ")}.`,
      });
    }
    next();
  };
}

export async function requireDepartmentAccess(req, res, next) {
  const { role, department } = req.user;
  const queryDepartment = req.query.department;

  if (!queryDepartment) {
    return res
      .status(400)
      .json({ message: "Department parameter is required." });
  }

  if (role === "AssistantTeacher" && department !== queryDepartment) {
    return res.status(403).json({
      message: `Access denied for department: ${queryDepartment}.`,
    });
  }

  next();
}

export const roleMiddleware = requireRole;
export const departmentMiddleware = requireDepartmentAccess;
