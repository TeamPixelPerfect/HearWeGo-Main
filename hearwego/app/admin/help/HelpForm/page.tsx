"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  createHelpArticle,
  getHelpArticles,
  updateHelpArticle,
} from "../../../services/HelpServices";

import { HelpArticle } from "@/app/constants/models";
import DropFile from "@/app/components/DropFile";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  articalTitle: Yup.string().required("Title is required"),
  QandA: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required"),
    })
  ),
});

export const HelpDialog: React.FC<HelpDialogProps> = ({ open, onClose }) => {
  const initialFormData = {
    articalTitle: "",
    QandA: [{ question: "", answer: "" }],
  };
  const [formData, setFormData] = useState<HelpArticle>(initialFormData);
  const [helpArticles, setHelpArticles] = useState<HelpArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string>("");

  useEffect(() => {
    const fetchHelpArticles = async () => {
      try {
        const articles = await getHelpArticles();
        setHelpArticles(articles.data);
      } catch (error) {
        console.error("Error fetching help articles:", error);
      }
    };
    fetchHelpArticles();
  }, []);

  const handleArticleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const articleId = event.target.value as string;
    const selected = helpArticles.find(
      (article) => article.articalId === articleId
    );

    if (selected) {
      setFormData({
        articalTitle: selected.articalTitle,
        QandA: selected.QandA || [{ question: "", answer: "" }],
      });
      setSelectedArticle(articleId);
    } else {
      setFormData(initialFormData);
      setSelectedArticle("");
    }
  };

  const handleClose = (resetForm: () => void) => {
    resetForm();
    setSelectedArticle("");
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (
        values,
        { setSubmitting }: FormikHelpers<HelpArticle>
      ) => {
        try {
          await updateHelpArticle(selectedArticle, values);
          console.log("Article updated successfully:", values);
          handleClose(() => {});
        } catch (error) {
          console.error("Error updating article:", error);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm,
      }) => (
        <Dialog
          open={open}
          onClose={() => handleClose(resetForm)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Q&A</DialogTitle>
          <DialogContent>
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="article-label">Select Article</InputLabel>
                <Select
                  labelId="article-label"
                  name="selectedArticle"
                  value={selectedArticle}
                  onChange={handleArticleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {helpArticles.map((article) => (
                    <MenuItem key={article.articalId} value={article.articalId}>
                      {article.articalTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {selectedArticle && (
              <Box>
                {values.QandA.map((question, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <TextField
                      label={`Question ${index + 1}`}
                      name={`QandA.${index}.question`}
                      value={question.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      margin="normal"
                      error={
                        touched.QandA?.[index]?.question &&
                        !!errors.QandA?.[index]?.question
                      }
                      helperText={
                        touched.QandA?.[index]?.question &&
                        errors.QandA?.[index]?.question
                      }
                    />
                    <TextField
                      label={`Answer ${index + 1}`}
                      name={`QandA.${index}.answer`}
                      value={question.answer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      margin="normal"
                      error={
                        touched.QandA?.[index]?.answer &&
                        !!errors.QandA?.[index]?.answer
                      }
                      helperText={
                        touched.QandA?.[index]?.answer &&
                        errors.QandA?.[index]?.answer
                      }
                    />
                  </Box>
                ))}
                <Button
                  variant="contained"
                  onClick={() => {
                    const newQandA = [
                      ...values.QandA,
                      { question: "", answer: "" },
                    ];
                    setFormData({ ...formData, QandA: newQandA });
                  }}
                >
                  Add Another Question
                </Button>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(resetForm)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              color="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

const categoryValidationSchema = Yup.object().shape({
  articalTitle: Yup.string().required("Category Name is required"),
  articalImage_URL: Yup.mixed().required("Image is required"), // Adjust according to your image handling logic
});

export const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  open,
  onClose,
}) => {
  const initialCategoryData = {
    articalTitle: "",
    articalImage_URL: null,
  };
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<HelpArticle>({
    articalTitle: "",
    QandA: [{ question: "", answer: "" }],
  });

  useEffect(() => {
    if (!open) {
      setCategoryName("");
      setImage(null);
    }
  }, [open]);

  const handleClose = (resetForm: () => void) => {
    resetForm();
    setCategoryName("");
    setImage(null);
    setCategory(initialCategoryData);
    onClose();
  };

  return (
    <Formik
      initialValues={{ articalTitle: categoryName, articalImage_URL: image }}
      validationSchema={categoryValidationSchema}
      onSubmit={async (
        values,
        {
          setSubmitting,
        }: FormikHelpers<{
          articalTitle: string;
          articalImage_URL: File | null;
        }>
      ) => {
        const updatedCategory: HelpArticle = {
          ...category,
          articalTitle: values.articalTitle,
          articalImage_URL: values.articalImage_URL,
        };

        try {
          await createHelpArticle(updatedCategory);
          console.log("Category created successfully:", updatedCategory);
          handleClose(() => {});
        } catch (error) {
          console.error("Error creating category:", error);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm,
      }) => (
        <Dialog
          open={open}
          onClose={() => handleClose(resetForm)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Help Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              variant="outlined"
              name="articalTitle"
              value={values.articalTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.articalTitle && !!errors.articalTitle}
              helperText={touched.articalTitle && errors.articalTitle}
            />
            <Box mt={2}>
              <DropFile
                fileTypes="Category image"
                fileExtensions="JPEG,PNG,WEBP,SVG"
                isCircular={false}
                width="100%"
                height="220px"
                file={values.articalImage_URL}
                setFile={(file) => setFieldValue("articalImage_URL", file)}
                aspectX={1}
                aspectY={1}
                shape="rect"
              />
              {touched.articalImage_URL && errors.articalImage_URL && (
                <Typography color="error">{errors.articalImage_URL}</Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(resetForm)}>Cancel</Button>
            <Button
              onClick={() => handleSubmit()}
              color="primary"
              variant="contained"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};
