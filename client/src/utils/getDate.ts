export const getDate = (date: string) => {
  const dueDate = new Date(date);

  const month = dueDate.toLocaleString("en-US", { month: "long" });
  const day = dueDate.getDate();
  const year = dueDate.getFullYear();

  return `${month} ${day} ${year}`;
};
