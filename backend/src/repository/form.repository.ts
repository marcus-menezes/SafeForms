import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { firestore } from 'firebase-admin';

@Injectable()
export class FormRepository {
  private _collectionRef: firestore.CollectionReference;

  constructor() {
    this._collectionRef = firebase.firestore().collection('form');
  }

  public async getAllForms(userId: string): Promise<any[]> {
    try {
      const snapshot = await this._collectionRef
        .where('userId', '==', userId)
        .get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Failed to get forms: ${error.message}`);
    }
  }

  public async getForm(formId: string): Promise<any> {
    try {
      const doc = await this._collectionRef.doc(formId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      throw new Error(
        `Failed to get form for formId ${formId}: ${error.message}`,
      );
    }
  }

  public async createForm(data: any): Promise<string> {
    try {
      const docRef = await this._collectionRef.add(data);
      return docRef.id;
    } catch (error) {
      throw new Error(`Failed to create form: ${error.message}`);
    }
  }

  public async updateForm(formId: string, data: any): Promise<void> {
    try {
      const docRef = this._collectionRef.doc(formId);
      const doc = await docRef.get();
      if (doc.exists) {
        await docRef.update(data);
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      throw new Error(
        `Failed to update form for formId ${formId}: ${error.message}`,
      );
    }
  }

  public async deleteForm(formId: string): Promise<void> {
    try {
      const docRef = this._collectionRef.doc(formId);
      const doc = await docRef.get();
      if (doc.exists) {
        await docRef.delete();
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      throw new Error(
        `Failed to delete form for formId ${formId}: ${error.message}`,
      );
    }
  }
}
