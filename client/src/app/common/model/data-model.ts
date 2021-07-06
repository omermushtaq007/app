export interface Vendor {
  _id: String;
  slug: String;
}

export interface Certificate {
  _id: String;
  certificateName: String;
  slug: String;
  status: Boolean;
}

export interface Exam {
  _id: String;
  certificateName: String;
  slug: String;
  examName: String;
  examCode: String;
  question: Number;
  price: Number;
  status: Boolean;
  isRetired: Boolean;
  update: Date;
}
