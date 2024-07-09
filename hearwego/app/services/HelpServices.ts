import { base_url } from "../constants/keys";
import { HelpComplaints } from "../constants/models";

export const createComplaintForm = async (token: string, data: any) => {
  const res = await fetch(`${base_url}/HelpCenter/Help/ComplaintForm`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Complaints = await res.json();
    return Complaints;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getComplaints = async () => {
  const res = await fetch(`${base_url}/HelpCenter/Help/ComplaintForms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const Complaints = await res.json();
    console.log(Complaints);
    return Complaints;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getSingleComplaint = async (id: string) => {
  const res = await fetch(`${base_url}/HelpCenter/Help/ComplaintForm/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const Complaint = await res.json();
    return Complaint;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateComplaint = async (id: string, data: any) => {
  const res = await fetch(`${base_url}/HelpCenter/Help/ComplaintForm/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Complaint = await res.json();
    return Complaint;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const createHelpArticle = async (data: any) => {
  const res = await fetch(`${base_url}/HelpCenter/Help/HelpArtical`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Article = await res.json();
    return Article;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getHelpArticles = async () => {
  const res = await fetch(`${base_url}/HelpCenter/Help/HelpArticals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const Articles = await res.json();
    return Articles;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateHelpArticle = async (id: string, data: any) => {
  const res = await fetch(`${base_url}/HelpCenter/Help/HelpArtical/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Article = await res.json();
    return Article;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
