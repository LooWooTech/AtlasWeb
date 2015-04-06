﻿#region netDxf, Copyright(C) 2014 Daniel Carvajal, Licensed under LGPL.

//                        netDxf library
// Copyright (C) 2014 Daniel Carvajal (haplokuon@gmail.com)
// 
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

#endregion

using System;
using System.Collections;
using System.Collections.Generic;
using netDxf.Entities;

namespace netDxf.Collections
{
    /// <summary>
    /// Represents a dictionary of <see cref="AttributeDefinition">AttributeDefinitions</see>.
    /// </summary>
    public class AttributeDefinitionDictionary :
        IDictionary<string, AttributeDefinition>
    {
        #region delegates and events

        public delegate void BeforeAddItemEventHandler(AttributeDefinitionDictionary sender, AttributeDefinitionDictionaryEventArgs e);
        public delegate void AddItemEventHandler(AttributeDefinitionDictionary sender, AttributeDefinitionDictionaryEventArgs e);
        public delegate void RemoveItemEventHandler(AttributeDefinitionDictionary sender, AttributeDefinitionDictionaryEventArgs e);
        public delegate void BeforeRemoveItemEventHandler(AttributeDefinitionDictionary sender, AttributeDefinitionDictionaryEventArgs e);

        public event BeforeAddItemEventHandler BeforeAddItem;
        public event AddItemEventHandler AddItem;
        public event BeforeRemoveItemEventHandler BeforeRemoveItem;
        public event RemoveItemEventHandler RemoveItem;

        protected virtual bool OnBeforeAddItemEvent(AttributeDefinition item)
        {
            BeforeAddItemEventHandler ae = BeforeAddItem;
            if (ae != null)
            {
                AttributeDefinitionDictionaryEventArgs e = new AttributeDefinitionDictionaryEventArgs(item);
                ae(this, e);
                return e.Cancel;
            }
            return false;
        }

        protected virtual void OnAddItemEvent(AttributeDefinition item)
        {
            AddItemEventHandler ae = AddItem;
            if (ae != null)
                ae(this, new AttributeDefinitionDictionaryEventArgs(item));
        }

        protected virtual bool OnBeforeRemoveItemEvent(AttributeDefinition item)
        {
            BeforeRemoveItemEventHandler ae = BeforeRemoveItem;
            if (ae != null)
            {
                AttributeDefinitionDictionaryEventArgs e = new AttributeDefinitionDictionaryEventArgs(item);
                ae(this, e);
                return e.Cancel;
            }
            return false;
        }

        protected virtual void OnRemoveItemEvent(AttributeDefinition item)
        {
            RemoveItemEventHandler ae = RemoveItem;
            if (ae != null)
                ae(this, new AttributeDefinitionDictionaryEventArgs(item));
        }

        #endregion

        #region private fields

        private readonly Dictionary<string, AttributeDefinition> innerDictionary;

        #endregion

        #region constructor

        /// <summary>
        /// Initializes a new instance of <c>AttributeDefinitionDictionary</c>.
        /// </summary>
        public AttributeDefinitionDictionary()
        {
            this.innerDictionary = new Dictionary<string, AttributeDefinition>(StringComparer.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Initializes a new instance of <c>AttributeDefinitionDictionary</c> and has the specified initial capacity.
        /// </summary>
        /// <param name="capacity">The number of items the collection can initially store.</param>
        public AttributeDefinitionDictionary(int capacity)
        {
            this.innerDictionary = new Dictionary<string, AttributeDefinition>(capacity, StringComparer.OrdinalIgnoreCase);
        }

        #endregion

        #region public properties

        /// <summary>
        /// Gets or sets the <see cref="AttributeDefinition">attribute definition</see> with the specified tag.
        /// </summary>
        /// <param name="tag">The tag of the attribute definition to get or set.</param>
        /// <returns>The <see cref="AttributeDefinition">attribute definition</see> with the specified tag.</returns>
        public AttributeDefinition this[string tag]
        {
            get { return this.innerDictionary[tag]; }
            set
            {
                if (value == null) throw new ArgumentNullException("value");

                AttributeDefinition remove = this.innerDictionary[tag];

                if (OnBeforeRemoveItemEvent(remove)) return;
                if (OnBeforeAddItemEvent(value)) return;
                this.innerDictionary[tag] = value;
                OnAddItemEvent(value);
                OnRemoveItemEvent(remove);
            }
        }

        /// <summary>
        /// Gets an ICollection containing the tags of the current dictionary.
        /// </summary>
        public ICollection<string> Tags
        {
            get { return this.innerDictionary.Keys; }
        }

        /// <summary>
        /// Gets an ICollection containing the <see cref="AttributeDefinition">attribute definition</see> list of the current dictionary.
        /// </summary>
        public ICollection<AttributeDefinition> Values
        {
            get { return this.innerDictionary.Values; }
        }

        /// <summary>
        /// Gets the number of <see cref="AttributeDefinition">attribute definition</see> contained in the current dictionary.
        /// </summary>
        public int Count
        {
            get { return this.innerDictionary.Count; }
        }

        /// <summary>
        /// Gets a value indicating whether the actual dictionary is read-only.
        /// </summary>
        public bool IsReadOnly
        {
            get { return false; }
        }

        #endregion

        #region public methods

        /// <summary>
        /// Adds an <see cref="AttributeDefinition">attribute definition</see> to the current dictionary.
        /// </summary>
        /// <param name="item">The <see cref="AttributeDefinition">attribute definition</see> to add.</param>
        /// <returns>True is the <see cref="AttributeDefinition">attribute definition</see> has been correctly added to the dictionary; otherwise, false.</returns>
        public bool Add(AttributeDefinition item)
        {
            if (OnBeforeAddItemEvent(item)) return false;
            if (item == null) throw new ArgumentNullException("item");
            this.innerDictionary.Add(item.Tag, item);
            OnAddItemEvent(item);
            return true;
        }
        
        /// <summary>
        /// Removes an <see cref="AttributeDefinition">attribute definition</see> with the specified tag from the current dictionary.
        /// </summary>
        /// <param name="tag">The tag of the <see cref="AttributeDefinition">attribute definition</see> to remove.</param>
        /// <returns>True if the <see cref="AttributeDefinition">attribute definition</see> is successfully removed; otherwise, false.</returns>
        public bool Remove(string tag)
        {
            AttributeDefinition remove;
            if (!this.innerDictionary.TryGetValue(tag, out remove)) return false;
            if (OnBeforeRemoveItemEvent(remove)) return false;
            this.innerDictionary.Remove(tag);
            OnRemoveItemEvent(remove);
            return true;
        }

        /// <summary>
        /// Removes all <see cref="AttributeDefinition">attribute definition</see> from the current dictionary.
        /// </summary>
        public void Clear()
        {
            foreach (KeyValuePair<string, AttributeDefinition> item in this.innerDictionary)
            {
                this.Remove(item.Key);
            }
        }

        /// <summary>
        /// Determines whether current dictionary contains an <see cref="AttributeDefinition">attribute definition</see> with the specified tag.
        /// </summary>
        /// <param name="tag">The tag to locate in the current dictionary.</param>
        /// <returns>True if the current dictionary contains an <see cref="AttributeDefinition">attribute definition</see> with the tag; otherwise, false.</returns>
        public bool ContainsTag(string tag)
        {
            return this.innerDictionary.ContainsKey(tag);
        }

        /// <summary>
        /// Determines whether current dictionary contains a specified <see cref="AttributeDefinition">attribute definition</see>.
        /// </summary>
        /// <param name="value">The <see cref="AttributeDefinition">attribute definition</see> to locate in the current dictionary.</param>
        /// <returns>True if the current dictionary contains the <see cref="AttributeDefinition">attribute definition</see>; otherwise, false.</returns>
        public bool ContainsValue(AttributeDefinition value)
        {
            return this.innerDictionary.ContainsValue(value);
        }

        /// <summary>
        /// Gets the <see cref="AttributeDefinition">attribute definition</see> associated with the specified tag.
        /// </summary>
        /// <param name="tag">The tag whose value to get.</param>
        /// <param name="value">When this method returns, the <see cref="AttributeDefinition">attribute definition</see> associated with the specified tag,
        /// if the tag is found; otherwise, null. This parameter is passed uninitialized.</param>
        /// <returns>True if the current dictionary contains an <see cref="AttributeDefinition">attribute definition</see> with the specified tag; otherwise, false.</returns>
        public bool TryGetValue(string tag, out AttributeDefinition value)
        {
            return this.innerDictionary.TryGetValue(tag, out value);
        }

        /// <summary>
        /// Returns an enumerator that iterates through the dictionary.
        /// </summary>
        /// <returns>An enumerator that can be used to iterate through the dictionary.</returns>
        public IEnumerator<KeyValuePair<string, AttributeDefinition>> GetEnumerator()
        {
            return this.innerDictionary.GetEnumerator();
        }

        #endregion

        #region private properties

        ICollection<string> IDictionary<string, AttributeDefinition>.Keys
        {
            get { return this.innerDictionary.Keys; }
        }

        #endregion

        #region private methods

        bool IDictionary<string, AttributeDefinition>.ContainsKey(string tag)
        {
            return this.innerDictionary.ContainsKey(tag);
        }

        void IDictionary<string, AttributeDefinition>.Add(string key, AttributeDefinition value)
        {
            this.Add(value);
        }

        void ICollection<KeyValuePair<string, AttributeDefinition>>.Add(KeyValuePair<string, AttributeDefinition> item)
        {
            this.Add(item.Value);
        }

        bool ICollection<KeyValuePair<string, AttributeDefinition>>.Remove(KeyValuePair<string, AttributeDefinition> item)
        {
            if (!ReferenceEquals(item.Value, this.innerDictionary[item.Key])) return false;
            return this.Remove(item.Key);
        }

        bool ICollection<KeyValuePair<string, AttributeDefinition>>.Contains(KeyValuePair<string, AttributeDefinition> item)
        {
            return ((IDictionary<string, AttributeDefinition>)this.innerDictionary).Contains(item);
        }

        void ICollection<KeyValuePair<string, AttributeDefinition>>.CopyTo(KeyValuePair<string, AttributeDefinition>[] array, int arrayIndex)
        {
            ((IDictionary<string, AttributeDefinition>)this.innerDictionary).CopyTo(array, arrayIndex);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        #endregion
    }
}
