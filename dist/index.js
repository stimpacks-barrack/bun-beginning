var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/@sinclair/typebox/typebox.js
var require_typebox = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Type = exports.StandardType = exports.ExtendedTypeBuilder = exports.StandardTypeBuilder = exports.TypeBuilder = exports.TemplateLiteralDslParser = exports.TemplateLiteralGenerator = exports.TemplateLiteralFinite = exports.TemplateLiteralParser = exports.TemplateLiteralParserError = exports.TemplateLiteralResolver = exports.TemplateLiteralPattern = exports.UnionResolver = exports.KeyArrayResolver = exports.KeyResolver = exports.ObjectMap = exports.Intrinsic = exports.IndexedAccessor = exports.TypeClone = exports.TypeExtends = exports.TypeExtendsResult = exports.ExtendsUndefined = exports.TypeGuard = exports.TypeGuardUnknownTypeError = exports.ValueGuard = exports.FormatRegistry = exports.TypeRegistry = exports.PatternStringExact = exports.PatternNumberExact = exports.PatternBooleanExact = exports.PatternString = exports.PatternNumber = exports.PatternBoolean = exports.Kind = exports.Hint = exports.Optional = exports.Readonly = undefined;
  exports.Readonly = Symbol.for("TypeBox.Readonly");
  exports.Optional = Symbol.for("TypeBox.Optional");
  exports.Hint = Symbol.for("TypeBox.Hint");
  exports.Kind = Symbol.for("TypeBox.Kind");
  exports.PatternBoolean = "(true|false)";
  exports.PatternNumber = "(0|[1-9][0-9]*)";
  exports.PatternString = "(.*)";
  exports.PatternBooleanExact = `^${exports.PatternBoolean}\$`;
  exports.PatternNumberExact = `^${exports.PatternNumber}\$`;
  exports.PatternStringExact = `^${exports.PatternString}\$`;
  var TypeRegistry;
  (function(TypeRegistry2) {
    const map = new Map;
    function Entries() {
      return new Map(map);
    }
    TypeRegistry2.Entries = Entries;
    function Clear() {
      return map.clear();
    }
    TypeRegistry2.Clear = Clear;
    function Delete(kind) {
      return map.delete(kind);
    }
    TypeRegistry2.Delete = Delete;
    function Has(kind) {
      return map.has(kind);
    }
    TypeRegistry2.Has = Has;
    function Set2(kind, func) {
      map.set(kind, func);
    }
    TypeRegistry2.Set = Set2;
    function Get(kind) {
      return map.get(kind);
    }
    TypeRegistry2.Get = Get;
  })(TypeRegistry || (exports.TypeRegistry = TypeRegistry = {}));
  var FormatRegistry;
  (function(FormatRegistry2) {
    const map = new Map;
    function Entries() {
      return new Map(map);
    }
    FormatRegistry2.Entries = Entries;
    function Clear() {
      return map.clear();
    }
    FormatRegistry2.Clear = Clear;
    function Delete(format) {
      return map.delete(format);
    }
    FormatRegistry2.Delete = Delete;
    function Has(format) {
      return map.has(format);
    }
    FormatRegistry2.Has = Has;
    function Set2(format, func) {
      map.set(format, func);
    }
    FormatRegistry2.Set = Set2;
    function Get(format) {
      return map.get(format);
    }
    FormatRegistry2.Get = Get;
  })(FormatRegistry || (exports.FormatRegistry = FormatRegistry = {}));
  var ValueGuard;
  (function(ValueGuard2) {
    function IsObject(value) {
      return typeof value === "object" && value !== null;
    }
    ValueGuard2.IsObject = IsObject;
    function IsArray(value) {
      return Array.isArray(value);
    }
    ValueGuard2.IsArray = IsArray;
    function IsBoolean(value) {
      return typeof value === "boolean";
    }
    ValueGuard2.IsBoolean = IsBoolean;
    function IsNull(value) {
      return value === null;
    }
    ValueGuard2.IsNull = IsNull;
    function IsUndefined(value) {
      return value === undefined;
    }
    ValueGuard2.IsUndefined = IsUndefined;
    function IsBigInt(value) {
      return typeof value === "bigint";
    }
    ValueGuard2.IsBigInt = IsBigInt;
    function IsNumber(value) {
      return typeof value === "number";
    }
    ValueGuard2.IsNumber = IsNumber;
    function IsString(value) {
      return typeof value === "string";
    }
    ValueGuard2.IsString = IsString;
  })(ValueGuard || (exports.ValueGuard = ValueGuard = {}));

  class TypeGuardUnknownTypeError extends Error {
    constructor(schema) {
      super("TypeGuard: Unknown type");
      this.schema = schema;
    }
  }
  exports.TypeGuardUnknownTypeError = TypeGuardUnknownTypeError;
  var TypeGuard;
  (function(TypeGuard2) {
    function IsPattern(value) {
      try {
        new RegExp(value);
        return true;
      } catch {
        return false;
      }
    }
    function IsControlCharacterFree(value) {
      if (!ValueGuard.IsString(value))
        return false;
      for (let i = 0;i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (code >= 7 && code <= 13 || code === 27 || code === 127) {
          return false;
        }
      }
      return true;
    }
    function IsAdditionalProperties(value) {
      return IsOptionalBoolean(value) || TSchema(value);
    }
    function IsOptionalBigInt(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsBigInt(value);
    }
    function IsOptionalNumber(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsNumber(value);
    }
    function IsOptionalBoolean(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsBoolean(value);
    }
    function IsOptionalString(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value);
    }
    function IsOptionalPattern(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value) && IsPattern(value);
    }
    function IsOptionalFormat(value) {
      return ValueGuard.IsUndefined(value) || ValueGuard.IsString(value) && IsControlCharacterFree(value);
    }
    function IsOptionalSchema(value) {
      return ValueGuard.IsUndefined(value) || TSchema(value);
    }
    function TAny(schema) {
      return TKindOf(schema, "Any") && IsOptionalString(schema.$id);
    }
    TypeGuard2.TAny = TAny;
    function TArray(schema) {
      return TKindOf(schema, "Array") && schema.type === "array" && IsOptionalString(schema.$id) && TSchema(schema.items) && IsOptionalNumber(schema.minItems) && IsOptionalNumber(schema.maxItems) && IsOptionalBoolean(schema.uniqueItems) && IsOptionalSchema(schema.contains) && IsOptionalNumber(schema.minContains) && IsOptionalNumber(schema.maxContains);
    }
    TypeGuard2.TArray = TArray;
    function TAsyncIterator(schema) {
      return TKindOf(schema, "AsyncIterator") && schema.type === "AsyncIterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
    }
    TypeGuard2.TAsyncIterator = TAsyncIterator;
    function TBigInt(schema) {
      return TKindOf(schema, "BigInt") && schema.type === "bigint" && IsOptionalString(schema.$id) && IsOptionalBigInt(schema.multipleOf) && IsOptionalBigInt(schema.minimum) && IsOptionalBigInt(schema.maximum) && IsOptionalBigInt(schema.exclusiveMinimum) && IsOptionalBigInt(schema.exclusiveMaximum);
    }
    TypeGuard2.TBigInt = TBigInt;
    function TBoolean(schema) {
      return TKindOf(schema, "Boolean") && schema.type === "boolean" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TBoolean = TBoolean;
    function TConstructor(schema) {
      if (!(TKindOf(schema, "Constructor") && schema.type === "constructor" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && TSchema(schema.returns))) {
        return false;
      }
      for (const parameter of schema.parameters) {
        if (!TSchema(parameter))
          return false;
      }
      return true;
    }
    TypeGuard2.TConstructor = TConstructor;
    function TDate(schema) {
      return TKindOf(schema, "Date") && schema.type === "Date" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minimumTimestamp) && IsOptionalNumber(schema.maximumTimestamp) && IsOptionalNumber(schema.exclusiveMinimumTimestamp) && IsOptionalNumber(schema.exclusiveMaximumTimestamp);
    }
    TypeGuard2.TDate = TDate;
    function TFunction(schema) {
      if (!(TKindOf(schema, "Function") && schema.type === "function" && IsOptionalString(schema.$id) && ValueGuard.IsArray(schema.parameters) && TSchema(schema.returns))) {
        return false;
      }
      for (const parameter of schema.parameters) {
        if (!TSchema(parameter))
          return false;
      }
      return true;
    }
    TypeGuard2.TFunction = TFunction;
    function TInteger(schema) {
      return TKindOf(schema, "Integer") && schema.type === "integer" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.multipleOf) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.exclusiveMaximum);
    }
    TypeGuard2.TInteger = TInteger;
    function TIntersect(schema) {
      if (!(TKindOf(schema, "Intersect") && ValueGuard.IsArray(schema.allOf) && IsOptionalString(schema.type) && (IsOptionalBoolean(schema.unevaluatedProperties) || IsOptionalSchema(schema.unevaluatedProperties)) && IsOptionalString(schema.$id))) {
        return false;
      }
      if (("type" in schema) && schema.type !== "object") {
        return false;
      }
      for (const inner of schema.allOf) {
        if (!TSchema(inner))
          return false;
      }
      return true;
    }
    TypeGuard2.TIntersect = TIntersect;
    function TIterator(schema) {
      return TKindOf(schema, "Iterator") && schema.type === "Iterator" && IsOptionalString(schema.$id) && TSchema(schema.items);
    }
    TypeGuard2.TIterator = TIterator;
    function TKindOf(schema, kind) {
      return TKind(schema) && schema[exports.Kind] === kind;
    }
    TypeGuard2.TKindOf = TKindOf;
    function TKind(schema) {
      return ValueGuard.IsObject(schema) && (exports.Kind in schema) && ValueGuard.IsString(schema[exports.Kind]);
    }
    TypeGuard2.TKind = TKind;
    function TLiteralString(schema) {
      return TLiteral(schema) && ValueGuard.IsString(schema.const);
    }
    TypeGuard2.TLiteralString = TLiteralString;
    function TLiteralNumber(schema) {
      return TLiteral(schema) && ValueGuard.IsNumber(schema.const);
    }
    TypeGuard2.TLiteralNumber = TLiteralNumber;
    function TLiteralBoolean(schema) {
      return TLiteral(schema) && ValueGuard.IsBoolean(schema.const);
    }
    TypeGuard2.TLiteralBoolean = TLiteralBoolean;
    function TLiteral(schema) {
      return TKindOf(schema, "Literal") && IsOptionalString(schema.$id) && (ValueGuard.IsBoolean(schema.const) || ValueGuard.IsNumber(schema.const) || ValueGuard.IsString(schema.const));
    }
    TypeGuard2.TLiteral = TLiteral;
    function TNever(schema) {
      return TKindOf(schema, "Never") && ValueGuard.IsObject(schema.not) && Object.getOwnPropertyNames(schema.not).length === 0;
    }
    TypeGuard2.TNever = TNever;
    function TNot(schema) {
      return TKindOf(schema, "Not") && TSchema(schema.not);
    }
    TypeGuard2.TNot = TNot;
    function TNull(schema) {
      return TKindOf(schema, "Null") && schema.type === "null" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TNull = TNull;
    function TNumber(schema) {
      return TKindOf(schema, "Number") && schema.type === "number" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.multipleOf) && IsOptionalNumber(schema.minimum) && IsOptionalNumber(schema.maximum) && IsOptionalNumber(schema.exclusiveMinimum) && IsOptionalNumber(schema.exclusiveMaximum);
    }
    TypeGuard2.TNumber = TNumber;
    function TObject(schema) {
      if (!(TKindOf(schema, "Object") && schema.type === "object" && IsOptionalString(schema.$id) && ValueGuard.IsObject(schema.properties) && IsAdditionalProperties(schema.additionalProperties) && IsOptionalNumber(schema.minProperties) && IsOptionalNumber(schema.maxProperties))) {
        return false;
      }
      for (const [key, value] of Object.entries(schema.properties)) {
        if (!IsControlCharacterFree(key))
          return false;
        if (!TSchema(value))
          return false;
      }
      return true;
    }
    TypeGuard2.TObject = TObject;
    function TPromise(schema) {
      return TKindOf(schema, "Promise") && schema.type === "Promise" && IsOptionalString(schema.$id) && TSchema(schema.item);
    }
    TypeGuard2.TPromise = TPromise;
    function TRecord(schema) {
      if (!(TKindOf(schema, "Record") && schema.type === "object" && IsOptionalString(schema.$id) && IsAdditionalProperties(schema.additionalProperties) && ValueGuard.IsObject(schema.patternProperties))) {
        return false;
      }
      const keys = Object.getOwnPropertyNames(schema.patternProperties);
      if (keys.length !== 1) {
        return false;
      }
      if (!IsPattern(keys[0])) {
        return false;
      }
      if (!TSchema(schema.patternProperties[keys[0]])) {
        return false;
      }
      return true;
    }
    TypeGuard2.TRecord = TRecord;
    function TRef(schema) {
      return TKindOf(schema, "Ref") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
    }
    TypeGuard2.TRef = TRef;
    function TString(schema) {
      return TKindOf(schema, "String") && schema.type === "string" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minLength) && IsOptionalNumber(schema.maxLength) && IsOptionalPattern(schema.pattern) && IsOptionalFormat(schema.format);
    }
    TypeGuard2.TString = TString;
    function TSymbol(schema) {
      return TKindOf(schema, "Symbol") && schema.type === "symbol" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TSymbol = TSymbol;
    function TTemplateLiteral(schema) {
      return TKindOf(schema, "TemplateLiteral") && schema.type === "string" && ValueGuard.IsString(schema.pattern) && schema.pattern[0] === "^" && schema.pattern[schema.pattern.length - 1] === "$";
    }
    TypeGuard2.TTemplateLiteral = TTemplateLiteral;
    function TThis(schema) {
      return TKindOf(schema, "This") && IsOptionalString(schema.$id) && ValueGuard.IsString(schema.$ref);
    }
    TypeGuard2.TThis = TThis;
    function TTuple(schema) {
      if (!(TKindOf(schema, "Tuple") && schema.type === "array" && IsOptionalString(schema.$id) && ValueGuard.IsNumber(schema.minItems) && ValueGuard.IsNumber(schema.maxItems) && schema.minItems === schema.maxItems)) {
        return false;
      }
      if (ValueGuard.IsUndefined(schema.items) && ValueGuard.IsUndefined(schema.additionalItems) && schema.minItems === 0) {
        return true;
      }
      if (!ValueGuard.IsArray(schema.items)) {
        return false;
      }
      for (const inner of schema.items) {
        if (!TSchema(inner))
          return false;
      }
      return true;
    }
    TypeGuard2.TTuple = TTuple;
    function TUndefined(schema) {
      return TKindOf(schema, "Undefined") && schema.type === "undefined" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TUndefined = TUndefined;
    function TUnionLiteral(schema) {
      return TUnion(schema) && schema.anyOf.every((schema2) => TLiteralString(schema2) || TLiteralNumber(schema2));
    }
    TypeGuard2.TUnionLiteral = TUnionLiteral;
    function TUnion(schema) {
      if (!(TKindOf(schema, "Union") && ValueGuard.IsArray(schema.anyOf) && IsOptionalString(schema.$id))) {
        return false;
      }
      for (const inner of schema.anyOf) {
        if (!TSchema(inner))
          return false;
      }
      return true;
    }
    TypeGuard2.TUnion = TUnion;
    function TUint8Array(schema) {
      return TKindOf(schema, "Uint8Array") && schema.type === "Uint8Array" && IsOptionalString(schema.$id) && IsOptionalNumber(schema.minByteLength) && IsOptionalNumber(schema.maxByteLength);
    }
    TypeGuard2.TUint8Array = TUint8Array;
    function TUnknown(schema) {
      return TKindOf(schema, "Unknown") && IsOptionalString(schema.$id);
    }
    TypeGuard2.TUnknown = TUnknown;
    function TUnsafe(schema) {
      return TKindOf(schema, "Unsafe");
    }
    TypeGuard2.TUnsafe = TUnsafe;
    function TVoid(schema) {
      return TKindOf(schema, "Void") && schema.type === "void" && IsOptionalString(schema.$id);
    }
    TypeGuard2.TVoid = TVoid;
    function TReadonly(schema) {
      return ValueGuard.IsObject(schema) && schema[exports.Readonly] === "Readonly";
    }
    TypeGuard2.TReadonly = TReadonly;
    function TOptional(schema) {
      return ValueGuard.IsObject(schema) && schema[exports.Optional] === "Optional";
    }
    TypeGuard2.TOptional = TOptional;
    function TSchema(schema) {
      return ValueGuard.IsObject(schema) && (TAny(schema) || TArray(schema) || TBoolean(schema) || TBigInt(schema) || TAsyncIterator(schema) || TConstructor(schema) || TDate(schema) || TFunction(schema) || TInteger(schema) || TIntersect(schema) || TIterator(schema) || TLiteral(schema) || TNever(schema) || TNot(schema) || TNull(schema) || TNumber(schema) || TObject(schema) || TPromise(schema) || TRecord(schema) || TRef(schema) || TString(schema) || TSymbol(schema) || TTemplateLiteral(schema) || TThis(schema) || TTuple(schema) || TUndefined(schema) || TUnion(schema) || TUint8Array(schema) || TUnknown(schema) || TUnsafe(schema) || TVoid(schema) || TKind(schema) && TypeRegistry.Has(schema[exports.Kind]));
    }
    TypeGuard2.TSchema = TSchema;
  })(TypeGuard || (exports.TypeGuard = TypeGuard = {}));
  var ExtendsUndefined;
  (function(ExtendsUndefined2) {
    function Check(schema) {
      if (schema[exports.Kind] === "Undefined")
        return true;
      if (schema[exports.Kind] === "Not") {
        return !Check(schema.not);
      }
      if (schema[exports.Kind] === "Intersect") {
        const intersect = schema;
        return intersect.allOf.every((schema2) => Check(schema2));
      }
      if (schema[exports.Kind] === "Union") {
        const union = schema;
        return union.anyOf.some((schema2) => Check(schema2));
      }
      return false;
    }
    ExtendsUndefined2.Check = Check;
  })(ExtendsUndefined || (exports.ExtendsUndefined = ExtendsUndefined = {}));
  var TypeExtendsResult;
  (function(TypeExtendsResult2) {
    TypeExtendsResult2[TypeExtendsResult2["Union"] = 0] = "Union";
    TypeExtendsResult2[TypeExtendsResult2["True"] = 1] = "True";
    TypeExtendsResult2[TypeExtendsResult2["False"] = 2] = "False";
  })(TypeExtendsResult || (exports.TypeExtendsResult = TypeExtendsResult = {}));
  var TypeExtends;
  (function(TypeExtends2) {
    function IntoBooleanResult(result) {
      return result === TypeExtendsResult.False ? TypeExtendsResult.False : TypeExtendsResult.True;
    }
    function IsStructuralRight(right) {
      return TypeGuard.TNever(right) || TypeGuard.TIntersect(right) || TypeGuard.TUnion(right) || TypeGuard.TUnknown(right) || TypeGuard.TAny(right);
    }
    function StructuralRight(left, right) {
      if (TypeGuard.TNever(right))
        return TNeverRight(left, right);
      if (TypeGuard.TIntersect(right))
        return TIntersectRight(left, right);
      if (TypeGuard.TUnion(right))
        return TUnionRight(left, right);
      if (TypeGuard.TUnknown(right))
        return TUnknownRight(left, right);
      if (TypeGuard.TAny(right))
        return TAnyRight(left, right);
      throw Error("TypeExtends: StructuralRight");
    }
    function TAnyRight(left, right) {
      return TypeExtendsResult.True;
    }
    function TAny(left, right) {
      if (TypeGuard.TIntersect(right))
        return TIntersectRight(left, right);
      if (TypeGuard.TUnion(right) && right.anyOf.some((schema) => TypeGuard.TAny(schema) || TypeGuard.TUnknown(schema)))
        return TypeExtendsResult.True;
      if (TypeGuard.TUnion(right))
        return TypeExtendsResult.Union;
      if (TypeGuard.TUnknown(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TAny(right))
        return TypeExtendsResult.True;
      return TypeExtendsResult.Union;
    }
    function TArrayRight(left, right) {
      if (TypeGuard.TUnknown(left))
        return TypeExtendsResult.False;
      if (TypeGuard.TAny(left))
        return TypeExtendsResult.Union;
      if (TypeGuard.TNever(left))
        return TypeExtendsResult.True;
      return TypeExtendsResult.False;
    }
    function TArray(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right) && IsObjectArrayLike(right))
        return TypeExtendsResult.True;
      if (!TypeGuard.TArray(right))
        return TypeExtendsResult.False;
      return IntoBooleanResult(Visit(left.items, right.items));
    }
    function TAsyncIterator(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (!TypeGuard.TAsyncIterator(right))
        return TypeExtendsResult.False;
      return IntoBooleanResult(Visit(left.items, right.items));
    }
    function TBigInt(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TBigInt(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TBooleanRight(left, right) {
      if (TypeGuard.TLiteral(left) && ValueGuard.IsBoolean(left.const))
        return TypeExtendsResult.True;
      return TypeGuard.TBoolean(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TBoolean(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TBoolean(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TConstructor(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (!TypeGuard.TConstructor(right))
        return TypeExtendsResult.False;
      if (left.parameters.length > right.parameters.length)
        return TypeExtendsResult.False;
      if (!left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True)) {
        return TypeExtendsResult.False;
      }
      return IntoBooleanResult(Visit(left.returns, right.returns));
    }
    function TDate(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TDate(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TFunction(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (!TypeGuard.TFunction(right))
        return TypeExtendsResult.False;
      if (left.parameters.length > right.parameters.length)
        return TypeExtendsResult.False;
      if (!left.parameters.every((schema, index) => IntoBooleanResult(Visit(right.parameters[index], schema)) === TypeExtendsResult.True)) {
        return TypeExtendsResult.False;
      }
      return IntoBooleanResult(Visit(left.returns, right.returns));
    }
    function TIntegerRight(left, right) {
      if (TypeGuard.TLiteral(left) && ValueGuard.IsNumber(left.const))
        return TypeExtendsResult.True;
      return TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TInteger(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TIntersectRight(left, right) {
      return right.allOf.every((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TIntersect(left, right) {
      return left.allOf.some((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TIterator(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (!TypeGuard.TIterator(right))
        return TypeExtendsResult.False;
      return IntoBooleanResult(Visit(left.items, right.items));
    }
    function TLiteral(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      if (TypeGuard.TString(right))
        return TStringRight(left, right);
      if (TypeGuard.TNumber(right))
        return TNumberRight(left, right);
      if (TypeGuard.TInteger(right))
        return TIntegerRight(left, right);
      if (TypeGuard.TBoolean(right))
        return TBooleanRight(left, right);
      return TypeGuard.TLiteral(right) && right.const === left.const ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TNeverRight(left, right) {
      return TypeExtendsResult.False;
    }
    function TNever(left, right) {
      return TypeExtendsResult.True;
    }
    function UnwrapTNot(schema) {
      let [current, depth] = [schema, 0];
      while (true) {
        if (!TypeGuard.TNot(current))
          break;
        current = current.not;
        depth += 1;
      }
      return depth % 2 === 0 ? current : exports.Type.Unknown();
    }
    function TNot(left, right) {
      if (TypeGuard.TNot(left))
        return Visit(UnwrapTNot(left), right);
      if (TypeGuard.TNot(right))
        return Visit(left, UnwrapTNot(right));
      throw new Error(`TypeExtends: Invalid fallthrough for Not`);
    }
    function TNull(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TNull(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TNumberRight(left, right) {
      if (TypeGuard.TLiteralNumber(left))
        return TypeExtendsResult.True;
      return TypeGuard.TNumber(left) || TypeGuard.TInteger(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TNumber(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TInteger(right) || TypeGuard.TNumber(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function IsObjectPropertyCount(schema, count) {
      return Object.getOwnPropertyNames(schema.properties).length === count;
    }
    function IsObjectStringLike(schema) {
      return IsObjectArrayLike(schema);
    }
    function IsObjectSymbolLike(schema) {
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("description" in schema.properties) && TypeGuard.TUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (TypeGuard.TString(schema.properties.description.anyOf[0]) && TypeGuard.TUndefined(schema.properties.description.anyOf[1]) || TypeGuard.TString(schema.properties.description.anyOf[1]) && TypeGuard.TUndefined(schema.properties.description.anyOf[0]));
    }
    function IsObjectNumberLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectBooleanLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectBigIntLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectDateLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectUint8ArrayLike(schema) {
      return IsObjectArrayLike(schema);
    }
    function IsObjectFunctionLike(schema) {
      const length = exports.Type.Number();
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("length" in schema.properties) && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
    }
    function IsObjectConstructorLike(schema) {
      return IsObjectPropertyCount(schema, 0);
    }
    function IsObjectArrayLike(schema) {
      const length = exports.Type.Number();
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("length" in schema.properties) && IntoBooleanResult(Visit(schema.properties["length"], length)) === TypeExtendsResult.True;
    }
    function IsObjectPromiseLike(schema) {
      const then = exports.Type.Function([exports.Type.Any()], exports.Type.Any());
      return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && ("then" in schema.properties) && IntoBooleanResult(Visit(schema.properties["then"], then)) === TypeExtendsResult.True;
    }
    function Property(left, right) {
      if (Visit(left, right) === TypeExtendsResult.False)
        return TypeExtendsResult.False;
      if (TypeGuard.TOptional(left) && !TypeGuard.TOptional(right))
        return TypeExtendsResult.False;
      return TypeExtendsResult.True;
    }
    function TObjectRight(left, right) {
      if (TypeGuard.TUnknown(left))
        return TypeExtendsResult.False;
      if (TypeGuard.TAny(left))
        return TypeExtendsResult.Union;
      if (TypeGuard.TNever(left))
        return TypeExtendsResult.True;
      if (TypeGuard.TLiteralString(left) && IsObjectStringLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TLiteralNumber(left) && IsObjectNumberLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TLiteralBoolean(left) && IsObjectBooleanLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TBigInt(left) && IsObjectBigIntLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TString(left) && IsObjectStringLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TSymbol(left) && IsObjectSymbolLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TNumber(left) && IsObjectNumberLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TInteger(left) && IsObjectNumberLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TBoolean(left) && IsObjectBooleanLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TUint8Array(left) && IsObjectUint8ArrayLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TDate(left) && IsObjectDateLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TConstructor(left) && IsObjectConstructorLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TFunction(left) && IsObjectFunctionLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TRecord(left) && TypeGuard.TString(RecordKey(left))) {
        return right[exports.Hint] === "Record" ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      if (TypeGuard.TRecord(left) && TypeGuard.TNumber(RecordKey(left))) {
        return IsObjectPropertyCount(right, 0) ? TypeExtendsResult.True : TypeExtendsResult.False;
      }
      return TypeExtendsResult.False;
    }
    function TObject(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      if (!TypeGuard.TObject(right))
        return TypeExtendsResult.False;
      for (const key of Object.getOwnPropertyNames(right.properties)) {
        if (!(key in left.properties))
          return TypeExtendsResult.False;
        if (Property(left.properties[key], right.properties[key]) === TypeExtendsResult.False) {
          return TypeExtendsResult.False;
        }
      }
      return TypeExtendsResult.True;
    }
    function TPromise(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right) && IsObjectPromiseLike(right))
        return TypeExtendsResult.True;
      if (!TypeGuard.TPromise(right))
        return TypeExtendsResult.False;
      return IntoBooleanResult(Visit(left.item, right.item));
    }
    function RecordKey(schema) {
      if (exports.PatternNumberExact in schema.patternProperties)
        return exports.Type.Number();
      if (exports.PatternStringExact in schema.patternProperties)
        return exports.Type.String();
      throw Error("TypeExtends: Cannot get record key");
    }
    function RecordValue(schema) {
      if (exports.PatternNumberExact in schema.patternProperties)
        return schema.patternProperties[exports.PatternNumberExact];
      if (exports.PatternStringExact in schema.patternProperties)
        return schema.patternProperties[exports.PatternStringExact];
      throw Error("TypeExtends: Cannot get record value");
    }
    function TRecordRight(left, right) {
      const Key = RecordKey(right);
      const Value = RecordValue(right);
      if (TypeGuard.TLiteralString(left) && TypeGuard.TNumber(Key) && IntoBooleanResult(Visit(left, Value)) === TypeExtendsResult.True)
        return TypeExtendsResult.True;
      if (TypeGuard.TUint8Array(left) && TypeGuard.TNumber(Key))
        return Visit(left, Value);
      if (TypeGuard.TString(left) && TypeGuard.TNumber(Key))
        return Visit(left, Value);
      if (TypeGuard.TArray(left) && TypeGuard.TNumber(Key))
        return Visit(left, Value);
      if (TypeGuard.TObject(left)) {
        for (const key of Object.getOwnPropertyNames(left.properties)) {
          if (Property(Value, left.properties[key]) === TypeExtendsResult.False) {
            return TypeExtendsResult.False;
          }
        }
        return TypeExtendsResult.True;
      }
      return TypeExtendsResult.False;
    }
    function TRecord(left, right) {
      const Value = RecordValue(left);
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (!TypeGuard.TRecord(right))
        return TypeExtendsResult.False;
      return Visit(Value, RecordValue(right));
    }
    function TStringRight(left, right) {
      if (TypeGuard.TLiteral(left) && ValueGuard.IsString(left.const))
        return TypeExtendsResult.True;
      return TypeGuard.TString(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TString(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TString(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TSymbol(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TSymbol(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TTemplateLiteral(left, right) {
      if (TypeGuard.TTemplateLiteral(left))
        return Visit(TemplateLiteralResolver.Resolve(left), right);
      if (TypeGuard.TTemplateLiteral(right))
        return Visit(left, TemplateLiteralResolver.Resolve(right));
      throw new Error(`TypeExtends: Invalid fallthrough for TemplateLiteral`);
    }
    function IsArrayOfTuple(left, right) {
      return TypeGuard.TArray(right) && left.items !== undefined && left.items.every((schema) => Visit(schema, right.items) === TypeExtendsResult.True);
    }
    function TTupleRight(left, right) {
      if (TypeGuard.TNever(left))
        return TypeExtendsResult.True;
      if (TypeGuard.TUnknown(left))
        return TypeExtendsResult.False;
      if (TypeGuard.TAny(left))
        return TypeExtendsResult.Union;
      return TypeExtendsResult.False;
    }
    function TTuple(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right) && IsObjectArrayLike(right))
        return TypeExtendsResult.True;
      if (TypeGuard.TArray(right) && IsArrayOfTuple(left, right))
        return TypeExtendsResult.True;
      if (!TypeGuard.TTuple(right))
        return TypeExtendsResult.False;
      if (ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items) || !ValueGuard.IsUndefined(left.items) && ValueGuard.IsUndefined(right.items))
        return TypeExtendsResult.False;
      if (ValueGuard.IsUndefined(left.items) && !ValueGuard.IsUndefined(right.items))
        return TypeExtendsResult.True;
      return left.items.every((schema, index) => Visit(schema, right.items[index]) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUint8Array(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      return TypeGuard.TUint8Array(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUndefined(left, right) {
      if (IsStructuralRight(right))
        return StructuralRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      if (TypeGuard.TRecord(right))
        return TRecordRight(left, right);
      if (TypeGuard.TVoid(right))
        return VoidRight(left, right);
      return TypeGuard.TUndefined(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnionRight(left, right) {
      return right.anyOf.some((schema) => Visit(left, schema) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnion(left, right) {
      return left.anyOf.every((schema) => Visit(schema, right) === TypeExtendsResult.True) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TUnknownRight(left, right) {
      return TypeExtendsResult.True;
    }
    function TUnknown(left, right) {
      if (TypeGuard.TNever(right))
        return TNeverRight(left, right);
      if (TypeGuard.TIntersect(right))
        return TIntersectRight(left, right);
      if (TypeGuard.TUnion(right))
        return TUnionRight(left, right);
      if (TypeGuard.TAny(right))
        return TAnyRight(left, right);
      if (TypeGuard.TString(right))
        return TStringRight(left, right);
      if (TypeGuard.TNumber(right))
        return TNumberRight(left, right);
      if (TypeGuard.TInteger(right))
        return TIntegerRight(left, right);
      if (TypeGuard.TBoolean(right))
        return TBooleanRight(left, right);
      if (TypeGuard.TArray(right))
        return TArrayRight(left, right);
      if (TypeGuard.TTuple(right))
        return TTupleRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      return TypeGuard.TUnknown(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function VoidRight(left, right) {
      if (TypeGuard.TUndefined(left))
        return TypeExtendsResult.True;
      return TypeGuard.TUndefined(left) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function TVoid(left, right) {
      if (TypeGuard.TIntersect(right))
        return TIntersectRight(left, right);
      if (TypeGuard.TUnion(right))
        return TUnionRight(left, right);
      if (TypeGuard.TUnknown(right))
        return TUnknownRight(left, right);
      if (TypeGuard.TAny(right))
        return TAnyRight(left, right);
      if (TypeGuard.TObject(right))
        return TObjectRight(left, right);
      return TypeGuard.TVoid(right) ? TypeExtendsResult.True : TypeExtendsResult.False;
    }
    function Visit(left, right) {
      if (TypeGuard.TTemplateLiteral(left) || TypeGuard.TTemplateLiteral(right))
        return TTemplateLiteral(left, right);
      if (TypeGuard.TNot(left) || TypeGuard.TNot(right))
        return TNot(left, right);
      if (TypeGuard.TAny(left))
        return TAny(left, right);
      if (TypeGuard.TArray(left))
        return TArray(left, right);
      if (TypeGuard.TBigInt(left))
        return TBigInt(left, right);
      if (TypeGuard.TBoolean(left))
        return TBoolean(left, right);
      if (TypeGuard.TAsyncIterator(left))
        return TAsyncIterator(left, right);
      if (TypeGuard.TConstructor(left))
        return TConstructor(left, right);
      if (TypeGuard.TDate(left))
        return TDate(left, right);
      if (TypeGuard.TFunction(left))
        return TFunction(left, right);
      if (TypeGuard.TInteger(left))
        return TInteger(left, right);
      if (TypeGuard.TIntersect(left))
        return TIntersect(left, right);
      if (TypeGuard.TIterator(left))
        return TIterator(left, right);
      if (TypeGuard.TLiteral(left))
        return TLiteral(left, right);
      if (TypeGuard.TNever(left))
        return TNever(left, right);
      if (TypeGuard.TNull(left))
        return TNull(left, right);
      if (TypeGuard.TNumber(left))
        return TNumber(left, right);
      if (TypeGuard.TObject(left))
        return TObject(left, right);
      if (TypeGuard.TRecord(left))
        return TRecord(left, right);
      if (TypeGuard.TString(left))
        return TString(left, right);
      if (TypeGuard.TSymbol(left))
        return TSymbol(left, right);
      if (TypeGuard.TTuple(left))
        return TTuple(left, right);
      if (TypeGuard.TPromise(left))
        return TPromise(left, right);
      if (TypeGuard.TUint8Array(left))
        return TUint8Array(left, right);
      if (TypeGuard.TUndefined(left))
        return TUndefined(left, right);
      if (TypeGuard.TUnion(left))
        return TUnion(left, right);
      if (TypeGuard.TUnknown(left))
        return TUnknown(left, right);
      if (TypeGuard.TVoid(left))
        return TVoid(left, right);
      throw Error(`TypeExtends: Unknown left type operand '${left[exports.Kind]}'`);
    }
    function Extends(left, right) {
      return Visit(left, right);
    }
    TypeExtends2.Extends = Extends;
  })(TypeExtends || (exports.TypeExtends = TypeExtends = {}));
  var TypeClone;
  (function(TypeClone2) {
    function ObjectType(value) {
      const clonedProperties = Object.getOwnPropertyNames(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
      const clonedSymbols = Object.getOwnPropertySymbols(value).reduce((acc, key) => ({ ...acc, [key]: Visit(value[key]) }), {});
      return { ...clonedProperties, ...clonedSymbols };
    }
    function ArrayType(value) {
      return value.map((value2) => Visit(value2));
    }
    function Visit(value) {
      if (ValueGuard.IsArray(value))
        return ArrayType(value);
      if (ValueGuard.IsObject(value))
        return ObjectType(value);
      return value;
    }
    function Clone(schema, options = {}) {
      return { ...Visit(schema), ...options };
    }
    TypeClone2.Clone = Clone;
  })(TypeClone || (exports.TypeClone = TypeClone = {}));
  var IndexedAccessor;
  (function(IndexedAccessor2) {
    function OptionalUnwrap(schema) {
      return schema.map((schema2) => {
        const { [exports.Optional]: _, ...clone } = TypeClone.Clone(schema2);
        return clone;
      });
    }
    function IsIntersectOptional(schema) {
      return schema.every((schema2) => TypeGuard.TOptional(schema2));
    }
    function IsUnionOptional(schema) {
      return schema.some((schema2) => TypeGuard.TOptional(schema2));
    }
    function ResolveIntersect(schema) {
      const optional = IsIntersectOptional(schema.allOf);
      return optional ? exports.Type.Optional(exports.Type.Intersect(OptionalUnwrap(schema.allOf))) : schema;
    }
    function ResolveUnion(schema) {
      const optional = IsUnionOptional(schema.anyOf);
      return optional ? exports.Type.Optional(exports.Type.Union(OptionalUnwrap(schema.anyOf))) : schema;
    }
    function ResolveOptional(schema) {
      if (schema[exports.Kind] === "Intersect")
        return ResolveIntersect(schema);
      if (schema[exports.Kind] === "Union")
        return ResolveUnion(schema);
      return schema;
    }
    function TIntersect(schema, key) {
      const resolved = schema.allOf.reduce((acc, schema2) => {
        const indexed = Visit(schema2, key);
        return indexed[exports.Kind] === "Never" ? acc : [...acc, indexed];
      }, []);
      return ResolveOptional(exports.Type.Intersect(resolved));
    }
    function TUnion(schema, key) {
      const resolved = schema.anyOf.map((schema2) => Visit(schema2, key));
      return ResolveOptional(exports.Type.Union(resolved));
    }
    function TObject(schema, key) {
      const property = schema.properties[key];
      return ValueGuard.IsUndefined(property) ? exports.Type.Never() : exports.Type.Union([property]);
    }
    function TTuple(schema, key) {
      const items = schema.items;
      if (ValueGuard.IsUndefined(items))
        return exports.Type.Never();
      const element = items[key];
      if (ValueGuard.IsUndefined(element))
        return exports.Type.Never();
      return element;
    }
    function Visit(schema, key) {
      if (schema[exports.Kind] === "Intersect")
        return TIntersect(schema, key);
      if (schema[exports.Kind] === "Union")
        return TUnion(schema, key);
      if (schema[exports.Kind] === "Object")
        return TObject(schema, key);
      if (schema[exports.Kind] === "Tuple")
        return TTuple(schema, key);
      return exports.Type.Never();
    }
    function Resolve(schema, keys, options = {}) {
      const resolved = keys.map((key) => Visit(schema, key.toString()));
      return ResolveOptional(exports.Type.Union(resolved, options));
    }
    IndexedAccessor2.Resolve = Resolve;
  })(IndexedAccessor || (exports.IndexedAccessor = IndexedAccessor = {}));
  var Intrinsic;
  (function(Intrinsic2) {
    function Uncapitalize(value) {
      const [first, rest] = [value.slice(0, 1), value.slice(1)];
      return `${first.toLowerCase()}${rest}`;
    }
    function Capitalize(value) {
      const [first, rest] = [value.slice(0, 1), value.slice(1)];
      return `${first.toUpperCase()}${rest}`;
    }
    function Uppercase(value) {
      return value.toUpperCase();
    }
    function Lowercase(value) {
      return value.toLowerCase();
    }
    function IntrinsicTemplateLiteral(schema, mode) {
      const expression = TemplateLiteralParser.ParseExact(schema.pattern);
      const finite = TemplateLiteralFinite.Check(expression);
      if (!finite)
        return { ...schema, pattern: IntrinsicLiteral(schema.pattern, mode) };
      const strings = [...TemplateLiteralGenerator.Generate(expression)];
      const literals = strings.map((value) => exports.Type.Literal(value));
      const mapped = IntrinsicRest(literals, mode);
      const union = exports.Type.Union(mapped);
      return exports.Type.TemplateLiteral([union]);
    }
    function IntrinsicLiteral(value, mode) {
      return typeof value === "string" ? mode === "Uncapitalize" ? Uncapitalize(value) : mode === "Capitalize" ? Capitalize(value) : mode === "Uppercase" ? Uppercase(value) : mode === "Lowercase" ? Lowercase(value) : value : value.toString();
    }
    function IntrinsicRest(schema, mode) {
      if (schema.length === 0)
        return [];
      const [L, ...R] = schema;
      return [Map2(L, mode), ...IntrinsicRest(R, mode)];
    }
    function Visit(schema, mode) {
      if (TypeGuard.TTemplateLiteral(schema))
        return IntrinsicTemplateLiteral(schema, mode);
      if (TypeGuard.TUnion(schema))
        return exports.Type.Union(IntrinsicRest(schema.anyOf, mode));
      if (TypeGuard.TLiteral(schema))
        return exports.Type.Literal(IntrinsicLiteral(schema.const, mode));
      return schema;
    }
    function Map2(schema, mode) {
      return Visit(schema, mode);
    }
    Intrinsic2.Map = Map2;
  })(Intrinsic || (exports.Intrinsic = Intrinsic = {}));
  var ObjectMap;
  (function(ObjectMap2) {
    function TIntersect(schema, callback) {
      return exports.Type.Intersect(schema.allOf.map((inner) => Visit(inner, callback)), { ...schema });
    }
    function TUnion(schema, callback) {
      return exports.Type.Union(schema.anyOf.map((inner) => Visit(inner, callback)), { ...schema });
    }
    function TObject(schema, callback) {
      return callback(schema);
    }
    function Visit(schema, callback) {
      if (schema[exports.Kind] === "Intersect")
        return TIntersect(schema, callback);
      if (schema[exports.Kind] === "Union")
        return TUnion(schema, callback);
      if (schema[exports.Kind] === "Object")
        return TObject(schema, callback);
      return schema;
    }
    function Map2(schema, callback, options) {
      return { ...Visit(TypeClone.Clone(schema), callback), ...options };
    }
    ObjectMap2.Map = Map2;
  })(ObjectMap || (exports.ObjectMap = ObjectMap = {}));
  var KeyResolver;
  (function(KeyResolver2) {
    function UnwrapPattern(key) {
      return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
    }
    function TIntersect(schema, options) {
      return schema.allOf.reduce((acc, schema2) => [...acc, ...Visit(schema2, options)], []);
    }
    function TUnion(schema, options) {
      const sets = schema.anyOf.map((inner) => Visit(inner, options));
      return [...sets.reduce((set, outer) => outer.map((key) => sets.every((inner) => inner.includes(key)) ? set.add(key) : set)[0], new Set)];
    }
    function TObject(schema, options) {
      return Object.getOwnPropertyNames(schema.properties);
    }
    function TRecord(schema, options) {
      return options.includePatterns ? Object.getOwnPropertyNames(schema.patternProperties) : [];
    }
    function Visit(schema, options) {
      if (TypeGuard.TIntersect(schema))
        return TIntersect(schema, options);
      if (TypeGuard.TUnion(schema))
        return TUnion(schema, options);
      if (TypeGuard.TObject(schema))
        return TObject(schema, options);
      if (TypeGuard.TRecord(schema))
        return TRecord(schema, options);
      return [];
    }
    function ResolveKeys(schema, options) {
      return [...new Set(Visit(schema, options))];
    }
    KeyResolver2.ResolveKeys = ResolveKeys;
    function ResolvePattern(schema) {
      const keys = ResolveKeys(schema, { includePatterns: true });
      const pattern = keys.map((key) => `(${UnwrapPattern(key)})`);
      return `^(${pattern.join("|")})\$`;
    }
    KeyResolver2.ResolvePattern = ResolvePattern;
  })(KeyResolver || (exports.KeyResolver = KeyResolver = {}));
  var KeyArrayResolver;
  (function(KeyArrayResolver2) {
    function Resolve(schema) {
      if (Array.isArray(schema))
        return schema;
      if (TypeGuard.TUnionLiteral(schema))
        return schema.anyOf.map((schema2) => schema2.const.toString());
      if (TypeGuard.TLiteral(schema))
        return [schema.const];
      if (TypeGuard.TTemplateLiteral(schema)) {
        const expression = TemplateLiteralParser.ParseExact(schema.pattern);
        if (!TemplateLiteralFinite.Check(expression))
          throw Error("KeyArrayResolver: Cannot resolve keys from infinite template expression");
        return [...TemplateLiteralGenerator.Generate(expression)];
      }
      return [];
    }
    KeyArrayResolver2.Resolve = Resolve;
  })(KeyArrayResolver || (exports.KeyArrayResolver = KeyArrayResolver = {}));
  var UnionResolver;
  (function(UnionResolver2) {
    function* TUnion(union) {
      for (const schema of union.anyOf) {
        if (schema[exports.Kind] === "Union") {
          yield* TUnion(schema);
        } else {
          yield schema;
        }
      }
    }
    function Resolve(union) {
      return exports.Type.Union([...TUnion(union)], { ...union });
    }
    UnionResolver2.Resolve = Resolve;
  })(UnionResolver || (exports.UnionResolver = UnionResolver = {}));
  var TemplateLiteralPattern;
  (function(TemplateLiteralPattern2) {
    function Escape(value) {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function Visit(schema, acc) {
      if (TypeGuard.TTemplateLiteral(schema)) {
        return schema.pattern.slice(1, schema.pattern.length - 1);
      } else if (TypeGuard.TUnion(schema)) {
        return `(${schema.anyOf.map((schema2) => Visit(schema2, acc)).join("|")})`;
      } else if (TypeGuard.TNumber(schema)) {
        return `${acc}${exports.PatternNumber}`;
      } else if (TypeGuard.TInteger(schema)) {
        return `${acc}${exports.PatternNumber}`;
      } else if (TypeGuard.TBigInt(schema)) {
        return `${acc}${exports.PatternNumber}`;
      } else if (TypeGuard.TString(schema)) {
        return `${acc}${exports.PatternString}`;
      } else if (TypeGuard.TLiteral(schema)) {
        return `${acc}${Escape(schema.const.toString())}`;
      } else if (TypeGuard.TBoolean(schema)) {
        return `${acc}${exports.PatternBoolean}`;
      } else if (TypeGuard.TNever(schema)) {
        throw Error("TemplateLiteralPattern: TemplateLiteral cannot operate on types of TNever");
      } else {
        throw Error(`TemplateLiteralPattern: Unexpected Kind '${schema[exports.Kind]}'`);
      }
    }
    function Create(kinds) {
      return `^${kinds.map((schema) => Visit(schema, "")).join("")}$`;
    }
    TemplateLiteralPattern2.Create = Create;
  })(TemplateLiteralPattern || (exports.TemplateLiteralPattern = TemplateLiteralPattern = {}));
  var TemplateLiteralResolver;
  (function(TemplateLiteralResolver2) {
    function Resolve(template) {
      const expression = TemplateLiteralParser.ParseExact(template.pattern);
      if (!TemplateLiteralFinite.Check(expression))
        return exports.Type.String();
      const literals = [...TemplateLiteralGenerator.Generate(expression)].map((value) => exports.Type.Literal(value));
      return exports.Type.Union(literals);
    }
    TemplateLiteralResolver2.Resolve = Resolve;
  })(TemplateLiteralResolver || (exports.TemplateLiteralResolver = TemplateLiteralResolver = {}));

  class TemplateLiteralParserError extends Error {
    constructor(message) {
      super(message);
    }
  }
  exports.TemplateLiteralParserError = TemplateLiteralParserError;
  var TemplateLiteralParser;
  (function(TemplateLiteralParser2) {
    function IsNonEscaped(pattern, index, char) {
      return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
    }
    function IsOpenParen(pattern, index) {
      return IsNonEscaped(pattern, index, "(");
    }
    function IsCloseParen(pattern, index) {
      return IsNonEscaped(pattern, index, ")");
    }
    function IsSeparator(pattern, index) {
      return IsNonEscaped(pattern, index, "|");
    }
    function IsGroup(pattern) {
      if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
        return false;
      let count = 0;
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (count === 0 && index !== pattern.length - 1)
          return false;
      }
      return true;
    }
    function InGroup(pattern) {
      return pattern.slice(1, pattern.length - 1);
    }
    function IsPrecedenceOr(pattern) {
      let count = 0;
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (IsSeparator(pattern, index) && count === 0)
          return true;
      }
      return false;
    }
    function IsPrecedenceAnd(pattern) {
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          return true;
      }
      return false;
    }
    function Or(pattern) {
      let [count, start] = [0, 0];
      const expressions = [];
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index))
          count += 1;
        if (IsCloseParen(pattern, index))
          count -= 1;
        if (IsSeparator(pattern, index) && count === 0) {
          const range2 = pattern.slice(start, index);
          if (range2.length > 0)
            expressions.push(Parse(range2));
          start = index + 1;
        }
      }
      const range = pattern.slice(start);
      if (range.length > 0)
        expressions.push(Parse(range));
      if (expressions.length === 0)
        return { type: "const", const: "" };
      if (expressions.length === 1)
        return expressions[0];
      return { type: "or", expr: expressions };
    }
    function And(pattern) {
      function Group(value, index) {
        if (!IsOpenParen(value, index))
          throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
        let count = 0;
        for (let scan = index;scan < value.length; scan++) {
          if (IsOpenParen(value, scan))
            count += 1;
          if (IsCloseParen(value, scan))
            count -= 1;
          if (count === 0)
            return [index, scan];
        }
        throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
      }
      function Range(pattern2, index) {
        for (let scan = index;scan < pattern2.length; scan++) {
          if (IsOpenParen(pattern2, scan))
            return [index, scan];
        }
        return [index, pattern2.length];
      }
      const expressions = [];
      for (let index = 0;index < pattern.length; index++) {
        if (IsOpenParen(pattern, index)) {
          const [start, end] = Group(pattern, index);
          const range = pattern.slice(start, end + 1);
          expressions.push(Parse(range));
          index = end;
        } else {
          const [start, end] = Range(pattern, index);
          const range = pattern.slice(start, end);
          if (range.length > 0)
            expressions.push(Parse(range));
          index = end - 1;
        }
      }
      if (expressions.length === 0)
        return { type: "const", const: "" };
      if (expressions.length === 1)
        return expressions[0];
      return { type: "and", expr: expressions };
    }
    function Parse(pattern) {
      if (IsGroup(pattern))
        return Parse(InGroup(pattern));
      if (IsPrecedenceOr(pattern))
        return Or(pattern);
      if (IsPrecedenceAnd(pattern))
        return And(pattern);
      return { type: "const", const: pattern };
    }
    TemplateLiteralParser2.Parse = Parse;
    function ParseExact(pattern) {
      return Parse(pattern.slice(1, pattern.length - 1));
    }
    TemplateLiteralParser2.ParseExact = ParseExact;
  })(TemplateLiteralParser || (exports.TemplateLiteralParser = TemplateLiteralParser = {}));
  var TemplateLiteralFinite;
  (function(TemplateLiteralFinite2) {
    function IsNumber(expression) {
      return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
    }
    function IsBoolean(expression) {
      return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
    }
    function IsString(expression) {
      return expression.type === "const" && expression.const === ".*";
    }
    function Check(expression) {
      if (IsBoolean(expression))
        return true;
      if (IsNumber(expression) || IsString(expression))
        return false;
      if (expression.type === "and")
        return expression.expr.every((expr) => Check(expr));
      if (expression.type === "or")
        return expression.expr.every((expr) => Check(expr));
      if (expression.type === "const")
        return true;
      throw Error(`TemplateLiteralFinite: Unknown expression type`);
    }
    TemplateLiteralFinite2.Check = Check;
  })(TemplateLiteralFinite || (exports.TemplateLiteralFinite = TemplateLiteralFinite = {}));
  var TemplateLiteralGenerator;
  (function(TemplateLiteralGenerator2) {
    function* Reduce(buffer) {
      if (buffer.length === 1)
        return yield* buffer[0];
      for (const left of buffer[0]) {
        for (const right of Reduce(buffer.slice(1))) {
          yield `${left}${right}`;
        }
      }
    }
    function* And(expression) {
      return yield* Reduce(expression.expr.map((expr) => [...Generate(expr)]));
    }
    function* Or(expression) {
      for (const expr of expression.expr)
        yield* Generate(expr);
    }
    function* Const(expression) {
      return yield expression.const;
    }
    function* Generate(expression) {
      if (expression.type === "and")
        return yield* And(expression);
      if (expression.type === "or")
        return yield* Or(expression);
      if (expression.type === "const")
        return yield* Const(expression);
      throw Error("TemplateLiteralGenerator: Unknown expression");
    }
    TemplateLiteralGenerator2.Generate = Generate;
  })(TemplateLiteralGenerator || (exports.TemplateLiteralGenerator = TemplateLiteralGenerator = {}));
  var TemplateLiteralDslParser;
  (function(TemplateLiteralDslParser2) {
    function* ParseUnion(template) {
      const trim = template.trim().replace(/"|'/g, "");
      if (trim === "boolean")
        return yield exports.Type.Boolean();
      if (trim === "number")
        return yield exports.Type.Number();
      if (trim === "bigint")
        return yield exports.Type.BigInt();
      if (trim === "string")
        return yield exports.Type.String();
      const literals = trim.split("|").map((literal) => exports.Type.Literal(literal.trim()));
      return yield literals.length === 0 ? exports.Type.Never() : literals.length === 1 ? literals[0] : exports.Type.Union(literals);
    }
    function* ParseTerminal(template) {
      if (template[1] !== "{") {
        const L = exports.Type.Literal("$");
        const R = ParseLiteral(template.slice(1));
        return yield* [L, ...R];
      }
      for (let i = 2;i < template.length; i++) {
        if (template[i] === "}") {
          const L = ParseUnion(template.slice(2, i));
          const R = ParseLiteral(template.slice(i + 1));
          return yield* [...L, ...R];
        }
      }
      yield exports.Type.Literal(template);
    }
    function* ParseLiteral(template) {
      for (let i = 0;i < template.length; i++) {
        if (template[i] === "$") {
          const L = exports.Type.Literal(template.slice(0, i));
          const R = ParseTerminal(template.slice(i));
          return yield* [L, ...R];
        }
      }
      yield exports.Type.Literal(template);
    }
    function Parse(template_dsl) {
      return [...ParseLiteral(template_dsl)];
    }
    TemplateLiteralDslParser2.Parse = Parse;
  })(TemplateLiteralDslParser || (exports.TemplateLiteralDslParser = TemplateLiteralDslParser = {}));
  var TypeOrdinal = 0;

  class TypeBuilder {
    Create(schema) {
      return schema;
    }
    Discard(schema, key) {
      const { [key]: _, ...rest } = schema;
      return rest;
    }
    Strict(schema) {
      return JSON.parse(JSON.stringify(schema));
    }
  }
  exports.TypeBuilder = TypeBuilder;

  class StandardTypeBuilder extends TypeBuilder {
    ReadonlyOptional(schema) {
      return this.Readonly(this.Optional(schema));
    }
    Readonly(schema) {
      return { ...TypeClone.Clone(schema), [exports.Readonly]: "Readonly" };
    }
    Optional(schema) {
      return { ...TypeClone.Clone(schema), [exports.Optional]: "Optional" };
    }
    Any(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Any" });
    }
    Array(schema, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Array", type: "array", items: TypeClone.Clone(schema) });
    }
    Boolean(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Boolean", type: "boolean" });
    }
    Capitalize(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Clone(schema), "Capitalize"), ...options };
    }
    Composite(objects, options) {
      const intersect = exports.Type.Intersect(objects, {});
      const keys = KeyResolver.ResolveKeys(intersect, { includePatterns: false });
      const properties = keys.reduce((acc, key) => ({ ...acc, [key]: exports.Type.Index(intersect, [key]) }), {});
      return exports.Type.Object(properties, options);
    }
    Enum(item, options = {}) {
      const values = Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
      const anyOf = values.map((value) => ValueGuard.IsString(value) ? { [exports.Kind]: "Literal", type: "string", const: value } : { [exports.Kind]: "Literal", type: "number", const: value });
      return this.Create({ ...options, [exports.Kind]: "Union", anyOf });
    }
    Extends(left, right, trueType, falseType, options = {}) {
      switch (TypeExtends.Extends(left, right)) {
        case TypeExtendsResult.Union:
          return this.Union([TypeClone.Clone(trueType, options), TypeClone.Clone(falseType, options)]);
        case TypeExtendsResult.True:
          return TypeClone.Clone(trueType, options);
        case TypeExtendsResult.False:
          return TypeClone.Clone(falseType, options);
      }
    }
    Exclude(unionType, excludedMembers, options = {}) {
      if (TypeGuard.TTemplateLiteral(unionType))
        return this.Exclude(TemplateLiteralResolver.Resolve(unionType), excludedMembers, options);
      if (TypeGuard.TTemplateLiteral(excludedMembers))
        return this.Exclude(unionType, TemplateLiteralResolver.Resolve(excludedMembers), options);
      if (TypeGuard.TUnion(unionType)) {
        const narrowed = unionType.anyOf.filter((inner) => TypeExtends.Extends(inner, excludedMembers) === TypeExtendsResult.False);
        return narrowed.length === 1 ? TypeClone.Clone(narrowed[0], options) : this.Union(narrowed, options);
      } else {
        return TypeExtends.Extends(unionType, excludedMembers) !== TypeExtendsResult.False ? this.Never(options) : TypeClone.Clone(unionType, options);
      }
    }
    Extract(type, union, options = {}) {
      if (TypeGuard.TTemplateLiteral(type))
        return this.Extract(TemplateLiteralResolver.Resolve(type), union, options);
      if (TypeGuard.TTemplateLiteral(union))
        return this.Extract(type, TemplateLiteralResolver.Resolve(union), options);
      if (TypeGuard.TUnion(type)) {
        const narrowed = type.anyOf.filter((inner) => TypeExtends.Extends(inner, union) !== TypeExtendsResult.False);
        return narrowed.length === 1 ? TypeClone.Clone(narrowed[0], options) : this.Union(narrowed, options);
      } else {
        return TypeExtends.Extends(type, union) !== TypeExtendsResult.False ? TypeClone.Clone(type, options) : this.Never(options);
      }
    }
    Index(schema, unresolved, options = {}) {
      if (TypeGuard.TArray(schema) && TypeGuard.TNumber(unresolved)) {
        return TypeClone.Clone(schema.items, options);
      } else if (TypeGuard.TTuple(schema) && TypeGuard.TNumber(unresolved)) {
        const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
        const cloned = items.map((schema2) => TypeClone.Clone(schema2));
        return this.Union(cloned, options);
      } else {
        const keys = KeyArrayResolver.Resolve(unresolved);
        const clone = TypeClone.Clone(schema);
        return IndexedAccessor.Resolve(clone, keys, options);
      }
    }
    Integer(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Integer", type: "integer" });
    }
    Intersect(allOf, options = {}) {
      if (allOf.length === 0)
        return exports.Type.Never();
      if (allOf.length === 1)
        return TypeClone.Clone(allOf[0], options);
      const objects = allOf.every((schema) => TypeGuard.TObject(schema));
      const cloned = allOf.map((schema) => TypeClone.Clone(schema));
      const clonedUnevaluatedProperties = TypeGuard.TSchema(options.unevaluatedProperties) ? { unevaluatedProperties: TypeClone.Clone(options.unevaluatedProperties) } : {};
      if (options.unevaluatedProperties === false || TypeGuard.TSchema(options.unevaluatedProperties) || objects) {
        return this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", type: "object", allOf: cloned });
      } else {
        return this.Create({ ...options, ...clonedUnevaluatedProperties, [exports.Kind]: "Intersect", allOf: cloned });
      }
    }
    KeyOf(schema, options = {}) {
      if (TypeGuard.TRecord(schema)) {
        const pattern = Object.getOwnPropertyNames(schema.patternProperties)[0];
        if (pattern === exports.PatternNumberExact)
          return this.Number(options);
        if (pattern === exports.PatternStringExact)
          return this.String(options);
        throw Error("StandardTypeBuilder: Unable to resolve key type from Record key pattern");
      } else if (TypeGuard.TTuple(schema)) {
        const items = ValueGuard.IsUndefined(schema.items) ? [] : schema.items;
        const literals = items.map((_, index) => exports.Type.Literal(index));
        return this.Union(literals, options);
      } else if (TypeGuard.TArray(schema)) {
        return this.Number(options);
      } else {
        const keys = KeyResolver.ResolveKeys(schema, { includePatterns: false });
        if (keys.length === 0)
          return this.Never(options);
        const literals = keys.map((key) => this.Literal(key));
        return this.Union(literals, options);
      }
    }
    Literal(value, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Literal", const: value, type: typeof value });
    }
    Lowercase(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Clone(schema), "Lowercase"), ...options };
    }
    Never(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Never", not: {} });
    }
    Not(schema, options) {
      return this.Create({ ...options, [exports.Kind]: "Not", not: TypeClone.Clone(schema) });
    }
    Null(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Null", type: "null" });
    }
    Number(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Number", type: "number" });
    }
    Object(properties, options = {}) {
      const propertyKeys = Object.getOwnPropertyNames(properties);
      const optionalKeys = propertyKeys.filter((key) => TypeGuard.TOptional(properties[key]));
      const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
      const clonedAdditionalProperties = TypeGuard.TSchema(options.additionalProperties) ? { additionalProperties: TypeClone.Clone(options.additionalProperties) } : {};
      const clonedProperties = propertyKeys.reduce((acc, key) => ({ ...acc, [key]: TypeClone.Clone(properties[key]) }), {});
      if (requiredKeys.length > 0) {
        return this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys });
      } else {
        return this.Create({ ...options, ...clonedAdditionalProperties, [exports.Kind]: "Object", type: "object", properties: clonedProperties });
      }
    }
    Omit(schema, unresolved, options = {}) {
      const keys = KeyArrayResolver.Resolve(unresolved);
      return ObjectMap.Map(TypeClone.Clone(schema), (object) => {
        if (ValueGuard.IsArray(object.required)) {
          object.required = object.required.filter((key) => !keys.includes(key));
          if (object.required.length === 0)
            delete object.required;
        }
        for (const key of Object.getOwnPropertyNames(object.properties)) {
          if (keys.includes(key))
            delete object.properties[key];
        }
        return this.Create(object);
      }, options);
    }
    Partial(schema, options = {}) {
      return ObjectMap.Map(schema, (object) => {
        const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
          return { ...acc, [key]: this.Optional(object.properties[key]) };
        }, {});
        return this.Object(properties, this.Discard(object, "required"));
      }, options);
    }
    Pick(schema, unresolved, options = {}) {
      const keys = KeyArrayResolver.Resolve(unresolved);
      return ObjectMap.Map(TypeClone.Clone(schema), (object) => {
        if (ValueGuard.IsArray(object.required)) {
          object.required = object.required.filter((key) => keys.includes(key));
          if (object.required.length === 0)
            delete object.required;
        }
        for (const key of Object.getOwnPropertyNames(object.properties)) {
          if (!keys.includes(key))
            delete object.properties[key];
        }
        return this.Create(object);
      }, options);
    }
    Record(key, schema, options = {}) {
      if (TypeGuard.TTemplateLiteral(key)) {
        const expression = TemplateLiteralParser.ParseExact(key.pattern);
        return TemplateLiteralFinite.Check(expression) ? this.Object([...TemplateLiteralGenerator.Generate(expression)].reduce((acc, key2) => ({ ...acc, [key2]: TypeClone.Clone(schema) }), {}), options) : this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [key.pattern]: TypeClone.Clone(schema) } });
      } else if (TypeGuard.TUnion(key)) {
        const union = UnionResolver.Resolve(key);
        if (TypeGuard.TUnionLiteral(union)) {
          const properties = union.anyOf.reduce((acc, literal) => ({ ...acc, [literal.const]: TypeClone.Clone(schema) }), {});
          return this.Object(properties, { ...options, [exports.Hint]: "Record" });
        } else
          throw Error("StandardTypeBuilder: Record key of type union contains non-literal types");
      } else if (TypeGuard.TLiteral(key)) {
        if (ValueGuard.IsString(key.const) || ValueGuard.IsNumber(key.const)) {
          return this.Object({ [key.const]: TypeClone.Clone(schema) }, options);
        } else
          throw Error("StandardTypeBuilder: Record key of type literal is not of type string or number");
      } else if (TypeGuard.TInteger(key) || TypeGuard.TNumber(key)) {
        return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [exports.PatternNumberExact]: TypeClone.Clone(schema) } });
      } else if (TypeGuard.TString(key)) {
        const pattern = ValueGuard.IsUndefined(key.pattern) ? exports.PatternStringExact : key.pattern;
        return this.Create({ ...options, [exports.Kind]: "Record", type: "object", patternProperties: { [pattern]: TypeClone.Clone(schema) } });
      } else {
        throw Error(`StandardTypeBuilder: Record key is an invalid type`);
      }
    }
    Recursive(callback, options = {}) {
      if (ValueGuard.IsUndefined(options.$id))
        options.$id = `T${TypeOrdinal++}`;
      const thisType = callback({ [exports.Kind]: "This", $ref: `${options.$id}` });
      thisType.$id = options.$id;
      return this.Create({ ...options, [exports.Hint]: "Recursive", ...thisType });
    }
    Ref(unresolved, options = {}) {
      if (ValueGuard.IsString(unresolved))
        return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved });
      if (ValueGuard.IsUndefined(unresolved.$id))
        throw Error("StandardTypeBuilder.Ref: Target type must specify an $id");
      return this.Create({ ...options, [exports.Kind]: "Ref", $ref: unresolved.$id });
    }
    Required(schema, options = {}) {
      return ObjectMap.Map(schema, (object) => {
        const properties = Object.getOwnPropertyNames(object.properties).reduce((acc, key) => {
          return { ...acc, [key]: this.Discard(object.properties[key], exports.Optional) };
        }, {});
        return this.Object(properties, object);
      }, options);
    }
    Rest(schema) {
      if (TypeGuard.TTuple(schema)) {
        if (ValueGuard.IsUndefined(schema.items))
          return [];
        return schema.items.map((schema2) => TypeClone.Clone(schema2));
      } else {
        return [TypeClone.Clone(schema)];
      }
    }
    String(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "String", type: "string" });
    }
    TemplateLiteral(unresolved, options = {}) {
      const pattern = ValueGuard.IsString(unresolved) ? TemplateLiteralPattern.Create(TemplateLiteralDslParser.Parse(unresolved)) : TemplateLiteralPattern.Create(unresolved);
      return this.Create({ ...options, [exports.Kind]: "TemplateLiteral", type: "string", pattern });
    }
    Tuple(items, options = {}) {
      const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
      const clonedItems = items.map((item) => TypeClone.Clone(item));
      const schema = items.length > 0 ? { ...options, [exports.Kind]: "Tuple", type: "array", items: clonedItems, additionalItems, minItems, maxItems } : { ...options, [exports.Kind]: "Tuple", type: "array", minItems, maxItems };
      return this.Create(schema);
    }
    Uncapitalize(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Clone(schema), "Uncapitalize"), ...options };
    }
    Union(union, options = {}) {
      if (TypeGuard.TTemplateLiteral(union)) {
        return TemplateLiteralResolver.Resolve(union);
      } else {
        const anyOf = union;
        if (anyOf.length === 0)
          return this.Never(options);
        if (anyOf.length === 1)
          return this.Create(TypeClone.Clone(anyOf[0], options));
        const clonedAnyOf = anyOf.map((schema) => TypeClone.Clone(schema));
        return this.Create({ ...options, [exports.Kind]: "Union", anyOf: clonedAnyOf });
      }
    }
    Unknown(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Unknown" });
    }
    Unsafe(options = {}) {
      return this.Create({ ...options, [exports.Kind]: options[exports.Kind] || "Unsafe" });
    }
    Uppercase(schema, options = {}) {
      return { ...Intrinsic.Map(TypeClone.Clone(schema), "Uppercase"), ...options };
    }
  }
  exports.StandardTypeBuilder = StandardTypeBuilder;

  class ExtendedTypeBuilder extends StandardTypeBuilder {
    AsyncIterator(items, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "AsyncIterator", type: "AsyncIterator", items: TypeClone.Clone(items) });
    }
    Awaited(schema, options = {}) {
      const AwaitedRest = (rest) => {
        if (rest.length === 0)
          return rest;
        const [L, ...R] = rest;
        return [this.Awaited(L), ...AwaitedRest(R)];
      };
      return TypeGuard.TIntersect(schema) ? exports.Type.Intersect(AwaitedRest(schema.allOf)) : TypeGuard.TUnion(schema) ? exports.Type.Union(AwaitedRest(schema.anyOf)) : TypeGuard.TPromise(schema) ? this.Awaited(schema.item) : TypeClone.Clone(schema, options);
    }
    BigInt(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "BigInt", type: "bigint" });
    }
    ConstructorParameters(schema, options = {}) {
      return this.Tuple([...schema.parameters], { ...options });
    }
    Constructor(parameters, returns, options) {
      const clonedReturns = TypeClone.Clone(returns);
      const clonedParameters = parameters.map((parameter) => TypeClone.Clone(parameter));
      return this.Create({ ...options, [exports.Kind]: "Constructor", type: "constructor", parameters: clonedParameters, returns: clonedReturns });
    }
    Date(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Date", type: "Date" });
    }
    Function(parameters, returns, options) {
      const clonedReturns = TypeClone.Clone(returns, {});
      const clonedParameters = parameters.map((parameter) => TypeClone.Clone(parameter));
      return this.Create({ ...options, [exports.Kind]: "Function", type: "function", parameters: clonedParameters, returns: clonedReturns });
    }
    InstanceType(schema, options = {}) {
      return TypeClone.Clone(schema.returns, options);
    }
    Iterator(items, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Iterator", type: "Iterator", items: TypeClone.Clone(items) });
    }
    Parameters(schema, options = {}) {
      return this.Tuple(schema.parameters, { ...options });
    }
    Promise(item, options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Promise", type: "Promise", item: TypeClone.Clone(item) });
    }
    RegExp(unresolved, options = {}) {
      const pattern = ValueGuard.IsString(unresolved) ? unresolved : unresolved.source;
      return this.Create({ ...options, [exports.Kind]: "String", type: "string", pattern });
    }
    RegEx(regex, options = {}) {
      return this.RegExp(regex, options);
    }
    ReturnType(schema, options = {}) {
      return TypeClone.Clone(schema.returns, options);
    }
    Symbol(options) {
      return this.Create({ ...options, [exports.Kind]: "Symbol", type: "symbol" });
    }
    Undefined(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Undefined", type: "undefined" });
    }
    Uint8Array(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Uint8Array", type: "Uint8Array" });
    }
    Void(options = {}) {
      return this.Create({ ...options, [exports.Kind]: "Void", type: "void" });
    }
  }
  exports.ExtendedTypeBuilder = ExtendedTypeBuilder;
  exports.StandardType = new StandardTypeBuilder;
  exports.Type = new ExtendedTypeBuilder;
});

// node_modules/@sinclair/typebox/system/system.js
var require_system = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeSystem = exports.TypeSystemDuplicateFormat = exports.TypeSystemDuplicateTypeKind = undefined;
  var Types = require_typebox();

  class TypeSystemDuplicateTypeKind extends Error {
    constructor(kind) {
      super(`Duplicate type kind '${kind}' detected`);
    }
  }
  exports.TypeSystemDuplicateTypeKind = TypeSystemDuplicateTypeKind;

  class TypeSystemDuplicateFormat extends Error {
    constructor(kind) {
      super(`Duplicate string format '${kind}' detected`);
    }
  }
  exports.TypeSystemDuplicateFormat = TypeSystemDuplicateFormat;
  var TypeSystem;
  (function(TypeSystem2) {
    TypeSystem2.ExactOptionalPropertyTypes = false;
    TypeSystem2.AllowArrayObjects = false;
    TypeSystem2.AllowNaN = false;
    TypeSystem2.AllowVoidNull = false;
    function Type(kind, check) {
      if (Types.TypeRegistry.Has(kind))
        throw new TypeSystemDuplicateTypeKind(kind);
      Types.TypeRegistry.Set(kind, check);
      return (options = {}) => Types.Type.Unsafe({ ...options, [Types.Kind]: kind });
    }
    TypeSystem2.Type = Type;
    function Format(format, check) {
      if (Types.FormatRegistry.Has(format))
        throw new TypeSystemDuplicateFormat(format);
      Types.FormatRegistry.Set(format, check);
      return format;
    }
    TypeSystem2.Format = Format;
  })(TypeSystem || (exports.TypeSystem = TypeSystem = {}));
});

// node_modules/@sinclair/typebox/system/index.js
var require_system2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(require_system(), exports);
});

// node_modules/@sinclair/typebox/value/guard.js
var require_guard = __commonJS((exports) => {
  var IsAsyncIterator = function(value) {
    return IsObject(value) && (Symbol.asyncIterator in value);
  };
  var IsIterator = function(value) {
    return IsObject(value) && (Symbol.iterator in value);
  };
  var IsTypedArray = function(value) {
    return ArrayBuffer.isView(value);
  };
  var IsPromise = function(value) {
    return value instanceof Promise;
  };
  var IsUint8Array = function(value) {
    return value instanceof Uint8Array;
  };
  var IsDate = function(value) {
    return value instanceof Date;
  };
  var HasPropertyKey = function(value, key) {
    return key in value;
  };
  var IsPlainObject = function(value) {
    return IsObject(value) && IsFunction(value.constructor) && value.constructor.name === "Object";
  };
  var IsObject = function(value) {
    return value !== null && typeof value === "object";
  };
  var IsArray = function(value) {
    return Array.isArray(value) && !ArrayBuffer.isView(value);
  };
  var IsUndefined = function(value) {
    return value === undefined;
  };
  var IsNull = function(value) {
    return value === null;
  };
  var IsBoolean = function(value) {
    return typeof value === "boolean";
  };
  var IsNumber = function(value) {
    return typeof value === "number";
  };
  var IsInteger = function(value) {
    return IsNumber(value) && Number.isInteger(value);
  };
  var IsBigInt = function(value) {
    return typeof value === "bigint";
  };
  var IsString = function(value) {
    return typeof value === "string";
  };
  var IsFunction = function(value) {
    return typeof value === "function";
  };
  var IsSymbol = function(value) {
    return typeof value === "symbol";
  };
  var IsValueType = function(value) {
    return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.IsValueType = exports.IsSymbol = exports.IsFunction = exports.IsString = exports.IsBigInt = exports.IsInteger = exports.IsNumber = exports.IsBoolean = exports.IsNull = exports.IsUndefined = exports.IsArray = exports.IsObject = exports.IsPlainObject = exports.HasPropertyKey = exports.IsDate = exports.IsUint8Array = exports.IsPromise = exports.IsTypedArray = exports.IsIterator = exports.IsAsyncIterator = undefined;
  exports.IsAsyncIterator = IsAsyncIterator;
  exports.IsIterator = IsIterator;
  exports.IsTypedArray = IsTypedArray;
  exports.IsPromise = IsPromise;
  exports.IsUint8Array = IsUint8Array;
  exports.IsDate = IsDate;
  exports.HasPropertyKey = HasPropertyKey;
  exports.IsPlainObject = IsPlainObject;
  exports.IsObject = IsObject;
  exports.IsArray = IsArray;
  exports.IsUndefined = IsUndefined;
  exports.IsNull = IsNull;
  exports.IsBoolean = IsBoolean;
  exports.IsNumber = IsNumber;
  exports.IsInteger = IsInteger;
  exports.IsBigInt = IsBigInt;
  exports.IsString = IsString;
  exports.IsFunction = IsFunction;
  exports.IsSymbol = IsSymbol;
  exports.IsValueType = IsValueType;
});

// node_modules/@sinclair/typebox/value/hash.js
var require_hash = __commonJS((exports) => {
  var ArrayType = function(value) {
    FNV1A64(ByteMarker.Array);
    for (const item of value) {
      Visit(item);
    }
  };
  var BooleanType = function(value) {
    FNV1A64(ByteMarker.Boolean);
    FNV1A64(value ? 1 : 0);
  };
  var BigIntType = function(value) {
    FNV1A64(ByteMarker.BigInt);
    F64In.setBigInt64(0, value);
    for (const byte of F64Out) {
      FNV1A64(byte);
    }
  };
  var DateType = function(value) {
    FNV1A64(ByteMarker.Date);
    Visit(value.getTime());
  };
  var NullType = function(value) {
    FNV1A64(ByteMarker.Null);
  };
  var NumberType = function(value) {
    FNV1A64(ByteMarker.Number);
    F64In.setFloat64(0, value);
    for (const byte of F64Out) {
      FNV1A64(byte);
    }
  };
  var ObjectType = function(value) {
    FNV1A64(ByteMarker.Object);
    for (const key of globalThis.Object.keys(value).sort()) {
      Visit(key);
      Visit(value[key]);
    }
  };
  var StringType = function(value) {
    FNV1A64(ByteMarker.String);
    for (let i = 0;i < value.length; i++) {
      FNV1A64(value.charCodeAt(i));
    }
  };
  var SymbolType = function(value) {
    FNV1A64(ByteMarker.Symbol);
    Visit(value.description);
  };
  var Uint8ArrayType = function(value) {
    FNV1A64(ByteMarker.Uint8Array);
    for (let i = 0;i < value.length; i++) {
      FNV1A64(value[i]);
    }
  };
  var UndefinedType = function(value) {
    return FNV1A64(ByteMarker.Undefined);
  };
  var Visit = function(value) {
    if (ValueGuard.IsArray(value))
      return ArrayType(value);
    if (ValueGuard.IsBoolean(value))
      return BooleanType(value);
    if (ValueGuard.IsBigInt(value))
      return BigIntType(value);
    if (ValueGuard.IsDate(value))
      return DateType(value);
    if (ValueGuard.IsNull(value))
      return NullType(value);
    if (ValueGuard.IsNumber(value))
      return NumberType(value);
    if (ValueGuard.IsPlainObject(value))
      return ObjectType(value);
    if (ValueGuard.IsString(value))
      return StringType(value);
    if (ValueGuard.IsSymbol(value))
      return SymbolType(value);
    if (ValueGuard.IsUint8Array(value))
      return Uint8ArrayType(value);
    if (ValueGuard.IsUndefined(value))
      return UndefinedType(value);
    throw new ValueHashError(value);
  };
  var FNV1A64 = function(byte) {
    Accumulator = Accumulator ^ Bytes[byte];
    Accumulator = Accumulator * Prime % Size;
  };
  var Hash = function(value) {
    Accumulator = BigInt("14695981039346656037");
    Visit(value);
    return Accumulator;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Hash = exports.ByteMarker = exports.ValueHashError = undefined;
  var ValueGuard = require_guard();

  class ValueHashError extends Error {
    constructor(value) {
      super(`Hash: Unable to hash value`);
      this.value = value;
    }
  }
  exports.ValueHashError = ValueHashError;
  var ByteMarker;
  (function(ByteMarker2) {
    ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
    ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
    ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
    ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
    ByteMarker2[ByteMarker2["String"] = 4] = "String";
    ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
    ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
    ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
    ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
    ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
    ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
  })(ByteMarker || (exports.ByteMarker = ByteMarker = {}));
  var Accumulator = BigInt("14695981039346656037");
  var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
  var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
  var F64 = new Float64Array(1);
  var F64In = new DataView(F64.buffer);
  var F64Out = new Uint8Array(F64.buffer);
  exports.Hash = Hash;
});

// node_modules/@sinclair/typebox/errors/errors.js
var require_errors = __commonJS((exports) => {
  var IsDefined = function(value) {
    return value !== undefined;
  };
  var IsExactOptionalProperty = function(value, key) {
    return index_1.TypeSystem.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  };
  var IsObject = function(value) {
    const isObject = ValueGuard.IsObject(value);
    return index_1.TypeSystem.AllowArrayObjects ? isObject : isObject && !ValueGuard.IsArray(value);
  };
  var IsRecordObject = function(value) {
    return IsObject(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  };
  var IsNumber = function(value) {
    const isNumber = ValueGuard.IsNumber(value);
    return index_1.TypeSystem.AllowNaN ? isNumber : isNumber && Number.isFinite(value);
  };
  var IsVoid = function(value) {
    const isUndefined = ValueGuard.IsUndefined(value);
    return index_1.TypeSystem.AllowVoidNull ? isUndefined || value === null : isUndefined;
  };
  function* TAny(schema, references, path, value) {
  }
  function* TArray(schema, references, path, value) {
    if (!ValueGuard.IsArray(value)) {
      return yield { type: ValueErrorType.Array, schema, path, value, message: `Expected array` };
    }
    if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
      yield { type: ValueErrorType.ArrayMinItems, schema, path, value, message: `Expected array length to be greater or equal to ${schema.minItems}` };
    }
    if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
      yield { type: ValueErrorType.ArrayMinItems, schema, path, value, message: `Expected array length to be less or equal to ${schema.maxItems}` };
    }
    for (let i = 0;i < value.length; i++) {
      yield* Visit(schema.items, references, `${path}/${i}`, value[i]);
    }
    if (schema.uniqueItems === true && !function() {
      const set = new Set;
      for (const element of value) {
        const hashed = ValueHash.Hash(element);
        if (set.has(hashed)) {
          return false;
        } else {
          set.add(hashed);
        }
      }
      return true;
    }()) {
      yield { type: ValueErrorType.ArrayUniqueItems, schema, path, value, message: `Expected array elements to be unique` };
    }
    if (!(IsDefined(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
      return;
    }
    const containsSchema = IsDefined(schema.contains) ? schema.contains : Types.Type.Never();
    const containsCount = value.reduce((acc, value2, index) => Visit(containsSchema, references, `${path}${index}`, value2).next().done === true ? acc + 1 : acc, 0);
    if (containsCount === 0) {
      yield { type: ValueErrorType.ArrayContains, schema, path, value, message: `Expected array to contain at least one matching type` };
    }
    if (ValueGuard.IsNumber(schema.minContains) && containsCount < schema.minContains) {
      yield { type: ValueErrorType.ArrayMinContains, schema, path, value, message: `Expected array to contain at least ${schema.minContains} matching types` };
    }
    if (ValueGuard.IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
      yield { type: ValueErrorType.ArrayMaxContains, schema, path, value, message: `Expected array to contain no more than ${schema.maxContains} matching types` };
    }
  }
  function* TAsyncIterator(schema, references, path, value) {
    if (!ValueGuard.IsAsyncIterator(value)) {
      yield { type: ValueErrorType.AsyncIterator, schema, path, value, message: `Expected value to be an async iterator` };
    }
  }
  function* TBigInt(schema, references, path, value) {
    if (!ValueGuard.IsBigInt(value)) {
      return yield { type: ValueErrorType.BigInt, schema, path, value, message: `Expected bigint` };
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
      yield { type: ValueErrorType.BigIntMultipleOf, schema, path, value, message: `Expected bigint to be a multiple of ${schema.multipleOf}` };
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield { type: ValueErrorType.BigIntExclusiveMinimum, schema, path, value, message: `Expected bigint to be greater than ${schema.exclusiveMinimum}` };
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield { type: ValueErrorType.BigIntExclusiveMaximum, schema, path, value, message: `Expected bigint to be less than ${schema.exclusiveMaximum}` };
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield { type: ValueErrorType.BigIntMinimum, schema, path, value, message: `Expected bigint to be greater or equal to ${schema.minimum}` };
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield { type: ValueErrorType.BigIntMaximum, schema, path, value, message: `Expected bigint to be less or equal to ${schema.maximum}` };
    }
  }
  function* TBoolean(schema, references, path, value) {
    if (!ValueGuard.IsBoolean(value)) {
      return yield { type: ValueErrorType.Boolean, schema, path, value, message: `Expected boolean` };
    }
  }
  function* TConstructor(schema, references, path, value) {
    yield* Visit(schema.returns, references, path, value.prototype);
  }
  function* TDate(schema, references, path, value) {
    if (!ValueGuard.IsDate(value)) {
      return yield { type: ValueErrorType.Date, schema, path, value, message: `Expected Date object` };
    }
    if (!isFinite(value.getTime())) {
      return yield { type: ValueErrorType.Date, schema, path, value, message: `Invalid Date` };
    }
    if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
      yield { type: ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value, message: `Expected Date timestamp to be greater than ${schema.exclusiveMinimum}` };
    }
    if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
      yield { type: ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value, message: `Expected Date timestamp to be less than ${schema.exclusiveMaximum}` };
    }
    if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
      yield { type: ValueErrorType.DateMinimumTimestamp, schema, path, value, message: `Expected Date timestamp to be greater or equal to ${schema.minimum}` };
    }
    if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
      yield { type: ValueErrorType.DateMaximumTimestamp, schema, path, value, message: `Expected Date timestamp to be less or equal to ${schema.maximum}` };
    }
  }
  function* TFunction(schema, references, path, value) {
    if (!ValueGuard.IsFunction(value)) {
      return yield { type: ValueErrorType.Function, schema, path, value, message: `Expected function` };
    }
  }
  function* TInteger(schema, references, path, value) {
    if (!ValueGuard.IsInteger(value)) {
      return yield { type: ValueErrorType.Integer, schema, path, value, message: `Expected integer` };
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      yield { type: ValueErrorType.IntegerMultipleOf, schema, path, value, message: `Expected integer to be a multiple of ${schema.multipleOf}` };
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield { type: ValueErrorType.IntegerExclusiveMinimum, schema, path, value, message: `Expected integer to be greater than ${schema.exclusiveMinimum}` };
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield { type: ValueErrorType.IntegerExclusiveMaximum, schema, path, value, message: `Expected integer to be less than ${schema.exclusiveMaximum}` };
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield { type: ValueErrorType.IntegerMinimum, schema, path, value, message: `Expected integer to be greater or equal to ${schema.minimum}` };
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield { type: ValueErrorType.IntegerMaximum, schema, path, value, message: `Expected integer to be less or equal to ${schema.maximum}` };
    }
  }
  function* TIntersect(schema, references, path, value) {
    for (const inner of schema.allOf) {
      const next = Visit(inner, references, path, value).next();
      if (!next.done) {
        yield next.value;
        yield { type: ValueErrorType.Intersect, schema, path, value, message: `Expected all sub schemas to be valid` };
        return;
      }
    }
    if (schema.unevaluatedProperties === false) {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      for (const valueKey of Object.getOwnPropertyNames(value)) {
        if (!keyCheck.test(valueKey)) {
          yield { type: ValueErrorType.IntersectUnevaluatedProperties, schema, path: `${path}/${valueKey}`, value, message: `Unexpected property` };
        }
      }
    }
    if (typeof schema.unevaluatedProperties === "object") {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      for (const valueKey of Object.getOwnPropertyNames(value)) {
        if (!keyCheck.test(valueKey)) {
          const next = Visit(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value[valueKey]).next();
          if (!next.done) {
            yield next.value;
            yield { type: ValueErrorType.IntersectUnevaluatedProperties, schema, path: `${path}/${valueKey}`, value, message: `Invalid additional property` };
            return;
          }
        }
      }
    }
  }
  function* TIterator(schema, references, path, value) {
    if (!(IsObject(value) && (Symbol.iterator in value))) {
      yield { type: ValueErrorType.Iterator, schema, path, value, message: `Expected value to be an iterator` };
    }
  }
  function* TLiteral(schema, references, path, value) {
    if (!(value === schema.const)) {
      const error = typeof schema.const === "string" ? `'${schema.const}'` : schema.const;
      return yield { type: ValueErrorType.Literal, schema, path, value, message: `Expected ${error}` };
    }
  }
  function* TNever(schema, references, path, value) {
    yield { type: ValueErrorType.Never, schema, path, value, message: `Value cannot be validated` };
  }
  function* TNot(schema, references, path, value) {
    if (Visit(schema.not, references, path, value).next().done === true) {
      yield { type: ValueErrorType.Not, schema, path, value, message: `Value should not validate` };
    }
  }
  function* TNull(schema, references, path, value) {
    if (!ValueGuard.IsNull(value)) {
      return yield { type: ValueErrorType.Null, schema, path, value, message: `Expected null` };
    }
  }
  function* TNumber(schema, references, path, value) {
    if (!IsNumber(value)) {
      return yield { type: ValueErrorType.Number, schema, path, value, message: `Expected number` };
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      yield { type: ValueErrorType.NumberMultipleOf, schema, path, value, message: `Expected number to be a multiple of ${schema.multipleOf}` };
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      yield { type: ValueErrorType.NumberExclusiveMinimum, schema, path, value, message: `Expected number to be greater than ${schema.exclusiveMinimum}` };
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      yield { type: ValueErrorType.NumberExclusiveMaximum, schema, path, value, message: `Expected number to be less than ${schema.exclusiveMaximum}` };
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      yield { type: ValueErrorType.NumberMinimum, schema, path, value, message: `Expected number to be greater or equal to ${schema.minimum}` };
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      yield { type: ValueErrorType.NumberMaximum, schema, path, value, message: `Expected number to be less or equal to ${schema.maximum}` };
    }
  }
  function* TObject(schema, references, path, value) {
    if (!IsObject(value)) {
      return yield { type: ValueErrorType.Object, schema, path, value, message: `Expected object` };
    }
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      yield { type: ValueErrorType.ObjectMinProperties, schema, path, value, message: `Expected object to have at least ${schema.minProperties} properties` };
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      yield { type: ValueErrorType.ObjectMaxProperties, schema, path, value, message: `Expected object to have no more than ${schema.maxProperties} properties` };
    }
    const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
    const knownKeys = Object.getOwnPropertyNames(schema.properties);
    const unknownKeys = Object.getOwnPropertyNames(value);
    for (const knownKey of knownKeys) {
      const property = schema.properties[knownKey];
      if (schema.required && schema.required.includes(knownKey)) {
        yield* Visit(property, references, `${path}/${knownKey}`, value[knownKey]);
        if (Types.ExtendsUndefined.Check(schema) && !(knownKey in value)) {
          yield { type: ValueErrorType.ObjectRequiredProperties, schema: property, path: `${path}/${knownKey}`, value: undefined, message: `Expected required property` };
        }
      } else {
        if (IsExactOptionalProperty(value, knownKey)) {
          yield* Visit(property, references, `${path}/${knownKey}`, value[knownKey]);
        }
      }
    }
    for (const requiredKey of requiredKeys) {
      if (unknownKeys.includes(requiredKey))
        continue;
      yield { type: ValueErrorType.ObjectRequiredProperties, schema: schema.properties[requiredKey], path: `${path}/${requiredKey}`, value: undefined, message: `Expected required property` };
    }
    if (schema.additionalProperties === false) {
      for (const valueKey of unknownKeys) {
        if (!knownKeys.includes(valueKey)) {
          yield { type: ValueErrorType.ObjectAdditionalProperties, schema, path: `${path}/${valueKey}`, value: value[valueKey], message: `Unexpected property` };
        }
      }
    }
    if (typeof schema.additionalProperties === "object") {
      for (const valueKey of unknownKeys) {
        if (knownKeys.includes(valueKey))
          continue;
        yield* Visit(schema.additionalProperties, references, `${path}/${valueKey}`, value[valueKey]);
      }
    }
  }
  function* TPromise(schema, references, path, value) {
    if (!ValueGuard.IsPromise(value)) {
      yield { type: ValueErrorType.Promise, schema, path, value, message: `Expected Promise` };
    }
  }
  function* TRecord(schema, references, path, value) {
    if (!IsRecordObject(value)) {
      return yield { type: ValueErrorType.Object, schema, path, value, message: `Expected record object` };
    }
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      yield { type: ValueErrorType.ObjectMinProperties, schema, path, value, message: `Expected object to have at least ${schema.minProperties} properties` };
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      yield { type: ValueErrorType.ObjectMaxProperties, schema, path, value, message: `Expected object to have no more than ${schema.maxProperties} properties` };
    }
    const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
    const regex = new RegExp(patternKey);
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (regex.test(propertyKey)) {
        yield* Visit(patternSchema, references, `${path}/${propertyKey}`, propertyValue);
        continue;
      }
      if (typeof schema.additionalProperties === "object") {
        yield* Visit(schema.additionalProperties, references, `${path}/${propertyKey}`, propertyValue);
      }
      if (schema.additionalProperties === false) {
        const propertyPath = `${path}/${propertyKey}`;
        const message = `Unexpected property '${propertyPath}'`;
        return yield { type: ValueErrorType.ObjectAdditionalProperties, schema, path: propertyPath, value: propertyValue, message };
      }
    }
  }
  function* TRef(schema, references, path, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueErrorsDereferenceError(schema);
    const target = references[index];
    yield* Visit(target, references, path, value);
  }
  function* TString(schema, references, path, value) {
    if (!ValueGuard.IsString(value)) {
      return yield { type: ValueErrorType.String, schema, path, value, message: "Expected string" };
    }
    if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
      yield { type: ValueErrorType.StringMinLength, schema, path, value, message: `Expected string length greater or equal to ${schema.minLength}` };
    }
    if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
      yield { type: ValueErrorType.StringMaxLength, schema, path, value, message: `Expected string length less or equal to ${schema.maxLength}` };
    }
    if (ValueGuard.IsString(schema.pattern)) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        yield { type: ValueErrorType.StringPattern, schema, path, value, message: `Expected string to match pattern ${schema.pattern}` };
      }
    }
    if (ValueGuard.IsString(schema.format)) {
      if (!Types.FormatRegistry.Has(schema.format)) {
        yield { type: ValueErrorType.StringFormatUnknown, schema, path, value, message: `Unknown string format '${schema.format}'` };
      } else {
        const format = Types.FormatRegistry.Get(schema.format);
        if (!format(value)) {
          yield { type: ValueErrorType.StringFormat, schema, path, value, message: `Expected string to match format '${schema.format}'` };
        }
      }
    }
  }
  function* TSymbol(schema, references, path, value) {
    if (!ValueGuard.IsSymbol(value)) {
      return yield { type: ValueErrorType.Symbol, schema, path, value, message: "Expected symbol" };
    }
  }
  function* TTemplateLiteral(schema, references, path, value) {
    if (!ValueGuard.IsString(value)) {
      return yield { type: ValueErrorType.String, schema, path, value, message: "Expected string" };
    }
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value)) {
      yield { type: ValueErrorType.StringPattern, schema, path, value, message: `Expected string to match pattern ${schema.pattern}` };
    }
  }
  function* TThis(schema, references, path, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueErrorsDereferenceError(schema);
    const target = references[index];
    yield* Visit(target, references, path, value);
  }
  function* TTuple(schema, references, path, value) {
    if (!ValueGuard.IsArray(value)) {
      return yield { type: ValueErrorType.Array, schema, path, value, message: "Expected Array" };
    }
    if (schema.items === undefined && !(value.length === 0)) {
      return yield { type: ValueErrorType.TupleZeroLength, schema, path, value, message: "Expected tuple to have 0 elements" };
    }
    if (!(value.length === schema.maxItems)) {
      yield { type: ValueErrorType.TupleLength, schema, path, value, message: `Expected tuple to have ${schema.maxItems} elements` };
    }
    if (!schema.items) {
      return;
    }
    for (let i = 0;i < schema.items.length; i++) {
      yield* Visit(schema.items[i], references, `${path}/${i}`, value[i]);
    }
  }
  function* TUndefined(schema, references, path, value) {
    if (!(value === undefined)) {
      yield { type: ValueErrorType.Undefined, schema, path, value, message: `Expected undefined` };
    }
  }
  function* TUnion(schema, references, path, value) {
    const errors = [];
    for (const inner of schema.anyOf) {
      const variantErrors = [...Visit(inner, references, path, value)];
      if (variantErrors.length === 0)
        return;
      errors.push(...variantErrors);
    }
    if (errors.length > 0) {
      yield { type: ValueErrorType.Union, schema, path, value, message: "Expected value of union" };
    }
    for (const error of errors) {
      yield error;
    }
  }
  function* TUint8Array(schema, references, path, value) {
    if (!ValueGuard.IsUint8Array(value)) {
      return yield { type: ValueErrorType.Uint8Array, schema, path, value, message: `Expected Uint8Array` };
    }
    if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
      yield { type: ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value, message: `Expected Uint8Array to have a byte length less or equal to ${schema.maxByteLength}` };
    }
    if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
      yield { type: ValueErrorType.Uint8ArrayMinByteLength, schema, path, value, message: `Expected Uint8Array to have a byte length greater or equal to ${schema.maxByteLength}` };
    }
  }
  function* TUnknown(schema, references, path, value) {
  }
  function* TVoid(schema, references, path, value) {
    if (!IsVoid(value)) {
      return yield { type: ValueErrorType.Void, schema, path, value, message: `Expected void` };
    }
  }
  function* TKind(schema, references, path, value) {
    const check = Types.TypeRegistry.Get(schema[Types.Kind]);
    if (!check(schema, value)) {
      return yield { type: ValueErrorType.Kind, schema, path, value, message: `Expected kind ${schema[Types.Kind]}` };
    }
  }
  function* Visit(schema, references, path, value) {
    const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return yield* TAny(schema_, references_, path, value);
      case "Array":
        return yield* TArray(schema_, references_, path, value);
      case "AsyncIterator":
        return yield* TAsyncIterator(schema_, references_, path, value);
      case "BigInt":
        return yield* TBigInt(schema_, references_, path, value);
      case "Boolean":
        return yield* TBoolean(schema_, references_, path, value);
      case "Constructor":
        return yield* TConstructor(schema_, references_, path, value);
      case "Date":
        return yield* TDate(schema_, references_, path, value);
      case "Function":
        return yield* TFunction(schema_, references_, path, value);
      case "Integer":
        return yield* TInteger(schema_, references_, path, value);
      case "Intersect":
        return yield* TIntersect(schema_, references_, path, value);
      case "Iterator":
        return yield* TIterator(schema_, references_, path, value);
      case "Literal":
        return yield* TLiteral(schema_, references_, path, value);
      case "Never":
        return yield* TNever(schema_, references_, path, value);
      case "Not":
        return yield* TNot(schema_, references_, path, value);
      case "Null":
        return yield* TNull(schema_, references_, path, value);
      case "Number":
        return yield* TNumber(schema_, references_, path, value);
      case "Object":
        return yield* TObject(schema_, references_, path, value);
      case "Promise":
        return yield* TPromise(schema_, references_, path, value);
      case "Record":
        return yield* TRecord(schema_, references_, path, value);
      case "Ref":
        return yield* TRef(schema_, references_, path, value);
      case "String":
        return yield* TString(schema_, references_, path, value);
      case "Symbol":
        return yield* TSymbol(schema_, references_, path, value);
      case "TemplateLiteral":
        return yield* TTemplateLiteral(schema_, references_, path, value);
      case "This":
        return yield* TThis(schema_, references_, path, value);
      case "Tuple":
        return yield* TTuple(schema_, references_, path, value);
      case "Undefined":
        return yield* TUndefined(schema_, references_, path, value);
      case "Union":
        return yield* TUnion(schema_, references_, path, value);
      case "Uint8Array":
        return yield* TUint8Array(schema_, references_, path, value);
      case "Unknown":
        return yield* TUnknown(schema_, references_, path, value);
      case "Void":
        return yield* TVoid(schema_, references_, path, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueErrorsUnknownTypeError(schema);
        return yield* TKind(schema_, references_, path, value);
    }
  }
  var Errors = function(...args) {
    const iterator = args.length === 3 ? Visit(args[0], args[1], "", args[2]) : Visit(args[0], [], "", args[1]);
    return new ValueErrorIterator(iterator);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Errors = exports.ValueErrorsDereferenceError = exports.ValueErrorsUnknownTypeError = exports.ValueErrorIterator = exports.ValueErrorType = undefined;
  var index_1 = require_system2();
  var Types = require_typebox();
  var ValueHash = require_hash();
  var ValueGuard = require_guard();
  var ValueErrorType;
  (function(ValueErrorType2) {
    ValueErrorType2[ValueErrorType2["Array"] = 0] = "Array";
    ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 1] = "ArrayMinItems";
    ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
    ValueErrorType2[ValueErrorType2["ArrayContains"] = 3] = "ArrayContains";
    ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 4] = "ArrayMinContains";
    ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 5] = "ArrayMaxContains";
    ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 6] = "ArrayUniqueItems";
    ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
    ValueErrorType2[ValueErrorType2["BigInt"] = 8] = "BigInt";
    ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 9] = "BigIntMultipleOf";
    ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 10] = "BigIntExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 11] = "BigIntExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 12] = "BigIntMinimum";
    ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 13] = "BigIntMaximum";
    ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
    ValueErrorType2[ValueErrorType2["Date"] = 15] = "Date";
    ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
    ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 17] = "DateExclusiveMaximumTimestamp";
    ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
    ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 19] = "DateMaximumTimestamp";
    ValueErrorType2[ValueErrorType2["Function"] = 20] = "Function";
    ValueErrorType2[ValueErrorType2["Integer"] = 21] = "Integer";
    ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 22] = "IntegerMultipleOf";
    ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 24] = "IntegerExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
    ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 26] = "IntegerMaximum";
    ValueErrorType2[ValueErrorType2["Intersect"] = 27] = "Intersect";
    ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
    ValueErrorType2[ValueErrorType2["Iterator"] = 29] = "Iterator";
    ValueErrorType2[ValueErrorType2["Literal"] = 30] = "Literal";
    ValueErrorType2[ValueErrorType2["Never"] = 31] = "Never";
    ValueErrorType2[ValueErrorType2["Not"] = 32] = "Not";
    ValueErrorType2[ValueErrorType2["Null"] = 33] = "Null";
    ValueErrorType2[ValueErrorType2["Number"] = 34] = "Number";
    ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 35] = "NumberMultipleOf";
    ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 36] = "NumberExclusiveMinimum";
    ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 37] = "NumberExclusiveMaximum";
    ValueErrorType2[ValueErrorType2["NumberMinimum"] = 38] = "NumberMinimum";
    ValueErrorType2[ValueErrorType2["NumberMaximum"] = 39] = "NumberMaximum";
    ValueErrorType2[ValueErrorType2["Object"] = 40] = "Object";
    ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 41] = "ObjectMinProperties";
    ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 42] = "ObjectMaxProperties";
    ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 43] = "ObjectAdditionalProperties";
    ValueErrorType2[ValueErrorType2["ObjectRequiredProperties"] = 44] = "ObjectRequiredProperties";
    ValueErrorType2[ValueErrorType2["Promise"] = 45] = "Promise";
    ValueErrorType2[ValueErrorType2["RecordKeyNumeric"] = 46] = "RecordKeyNumeric";
    ValueErrorType2[ValueErrorType2["RecordKeyString"] = 47] = "RecordKeyString";
    ValueErrorType2[ValueErrorType2["String"] = 48] = "String";
    ValueErrorType2[ValueErrorType2["StringMinLength"] = 49] = "StringMinLength";
    ValueErrorType2[ValueErrorType2["StringMaxLength"] = 50] = "StringMaxLength";
    ValueErrorType2[ValueErrorType2["StringPattern"] = 51] = "StringPattern";
    ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 52] = "StringFormatUnknown";
    ValueErrorType2[ValueErrorType2["StringFormat"] = 53] = "StringFormat";
    ValueErrorType2[ValueErrorType2["Symbol"] = 54] = "Symbol";
    ValueErrorType2[ValueErrorType2["TupleZeroLength"] = 55] = "TupleZeroLength";
    ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
    ValueErrorType2[ValueErrorType2["Undefined"] = 57] = "Undefined";
    ValueErrorType2[ValueErrorType2["Union"] = 58] = "Union";
    ValueErrorType2[ValueErrorType2["Uint8Array"] = 59] = "Uint8Array";
    ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 60] = "Uint8ArrayMinByteLength";
    ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 61] = "Uint8ArrayMaxByteLength";
    ValueErrorType2[ValueErrorType2["Void"] = 62] = "Void";
    ValueErrorType2[ValueErrorType2["Kind"] = 63] = "Kind";
  })(ValueErrorType || (exports.ValueErrorType = ValueErrorType = {}));

  class ValueErrorIterator {
    constructor(iterator) {
      this.iterator = iterator;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    First() {
      const next = this.iterator.next();
      return next.done ? undefined : next.value;
    }
  }
  exports.ValueErrorIterator = ValueErrorIterator;

  class ValueErrorsUnknownTypeError extends Error {
    constructor(schema) {
      super("ValueErrors: Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueErrorsUnknownTypeError = ValueErrorsUnknownTypeError;

  class ValueErrorsDereferenceError extends Error {
    constructor(schema) {
      super(`ValueErrors: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueErrorsDereferenceError = ValueErrorsDereferenceError;
  exports.Errors = Errors;
});

// node_modules/@sinclair/typebox/errors/index.js
var require_errors2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(require_errors(), exports);
});

// node_modules/@sinclair/typebox/value/pointer.js
var require_pointer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValuePointer = exports.ValuePointerRootDeleteError = exports.ValuePointerRootSetError = undefined;

  class ValuePointerRootSetError extends Error {
    constructor(value, path, update) {
      super("ValuePointer: Cannot set root value");
      this.value = value;
      this.path = path;
      this.update = update;
    }
  }
  exports.ValuePointerRootSetError = ValuePointerRootSetError;

  class ValuePointerRootDeleteError extends Error {
    constructor(value, path) {
      super("ValuePointer: Cannot delete root value");
      this.value = value;
      this.path = path;
    }
  }
  exports.ValuePointerRootDeleteError = ValuePointerRootDeleteError;
  var ValuePointer;
  (function(ValuePointer2) {
    function Escape(component) {
      return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    function* Format(pointer) {
      if (pointer === "")
        return;
      let [start, end] = [0, 0];
      for (let i = 0;i < pointer.length; i++) {
        const char = pointer.charAt(i);
        if (char === "/") {
          if (i === 0) {
            start = i + 1;
          } else {
            end = i;
            yield Escape(pointer.slice(start, end));
            start = i + 1;
          }
        } else {
          end = i;
        }
      }
      yield Escape(pointer.slice(start));
    }
    ValuePointer2.Format = Format;
    function Set2(value, pointer, update) {
      if (pointer === "")
        throw new ValuePointerRootSetError(value, pointer, update);
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined)
          next[component] = {};
        owner = next;
        next = next[component];
        key = component;
      }
      owner[key] = update;
    }
    ValuePointer2.Set = Set2;
    function Delete(value, pointer) {
      if (pointer === "")
        throw new ValuePointerRootDeleteError(value, pointer);
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined || next[component] === null)
          return;
        owner = next;
        next = next[component];
        key = component;
      }
      if (Array.isArray(owner)) {
        const index = parseInt(key);
        owner.splice(index, 1);
      } else {
        delete owner[key];
      }
    }
    ValuePointer2.Delete = Delete;
    function Has(value, pointer) {
      if (pointer === "")
        return true;
      let [owner, next, key] = [null, value, ""];
      for (const component of Format(pointer)) {
        if (next[component] === undefined)
          return false;
        owner = next;
        next = next[component];
        key = component;
      }
      return Object.getOwnPropertyNames(owner).includes(key);
    }
    ValuePointer2.Has = Has;
    function Get(value, pointer) {
      if (pointer === "")
        return value;
      let current = value;
      for (const component of Format(pointer)) {
        if (current[component] === undefined)
          return;
        current = current[component];
      }
      return current;
    }
    ValuePointer2.Get = Get;
  })(ValuePointer || (exports.ValuePointer = ValuePointer = {}));
});

// node_modules/@sinclair/typebox/value/clone.js
var require_clone = __commonJS((exports) => {
  var ObjectType = function(value) {
    const keys = [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    return keys.reduce((acc, key) => ({ ...acc, [key]: Clone(value[key]) }), {});
  };
  var ArrayType = function(value) {
    return value.map((element) => Clone(element));
  };
  var TypedArrayType = function(value) {
    return value.slice();
  };
  var DateType = function(value) {
    return new Date(value.toISOString());
  };
  var ValueType = function(value) {
    return value;
  };
  var AsyncIteratorType = function(value) {
    return value;
  };
  var IteratorType = function(value) {
    return value;
  };
  var FunctionType = function(value) {
    return value;
  };
  var PromiseType = function(value) {
    return value;
  };
  var Clone = function(value) {
    if (ValueGuard.IsArray(value))
      return ArrayType(value);
    if (ValueGuard.IsAsyncIterator(value))
      return AsyncIteratorType(value);
    if (ValueGuard.IsFunction(value))
      return FunctionType(value);
    if (ValueGuard.IsIterator(value))
      return IteratorType(value);
    if (ValueGuard.IsPromise(value))
      return PromiseType(value);
    if (ValueGuard.IsDate(value))
      return DateType(value);
    if (ValueGuard.IsPlainObject(value))
      return ObjectType(value);
    if (ValueGuard.IsTypedArray(value))
      return TypedArrayType(value);
    if (ValueGuard.IsValueType(value))
      return ValueType(value);
    throw new Error("ValueClone: Unable to clone value");
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Clone = undefined;
  var ValueGuard = require_guard();
  exports.Clone = Clone;
});

// node_modules/@sinclair/typebox/value/delta.js
var require_delta = __commonJS((exports) => {
  var CreateUpdate = function(path, value) {
    return { type: "update", path, value };
  };
  var CreateInsert = function(path, value) {
    return { type: "insert", path, value };
  };
  var CreateDelete = function(path) {
    return { type: "delete", path };
  };
  function* ObjectType(path, current, next) {
    if (!ValueGuard.IsPlainObject(next))
      return yield CreateUpdate(path, next);
    const currentKeys = [...Object.keys(current), ...Object.getOwnPropertySymbols(current)];
    const nextKeys = [...Object.keys(next), ...Object.getOwnPropertySymbols(next)];
    for (const key of currentKeys) {
      if (ValueGuard.IsSymbol(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if (ValueGuard.IsUndefined(next[key]) && nextKeys.includes(key))
        yield CreateUpdate(`${path}/${String(key)}`, undefined);
    }
    for (const key of nextKeys) {
      if (ValueGuard.IsUndefined(current[key]) || ValueGuard.IsUndefined(next[key]))
        continue;
      if (ValueGuard.IsSymbol(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      yield* Visit(`${path}/${String(key)}`, current[key], next[key]);
    }
    for (const key of nextKeys) {
      if (ValueGuard.IsSymbol(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if (ValueGuard.IsUndefined(current[key]))
        yield CreateInsert(`${path}/${String(key)}`, next[key]);
    }
    for (const key of currentKeys.reverse()) {
      if (ValueGuard.IsSymbol(key))
        throw new ValueDeltaObjectWithSymbolKeyError(key);
      if (ValueGuard.IsUndefined(next[key]) && !nextKeys.includes(key))
        yield CreateDelete(`${path}/${String(key)}`);
    }
  }
  function* ArrayType(path, current, next) {
    if (!ValueGuard.IsArray(next))
      return yield CreateUpdate(path, next);
    for (let i = 0;i < Math.min(current.length, next.length); i++) {
      yield* Visit(`${path}/${i}`, current[i], next[i]);
    }
    for (let i = 0;i < next.length; i++) {
      if (i < current.length)
        continue;
      yield CreateInsert(`${path}/${i}`, next[i]);
    }
    for (let i = current.length - 1;i >= 0; i--) {
      if (i < next.length)
        continue;
      yield CreateDelete(`${path}/${i}`);
    }
  }
  function* TypedArrayType(path, current, next) {
    if (!ValueGuard.IsTypedArray(next) || current.length !== next.length || Object.getPrototypeOf(current).constructor.name !== Object.getPrototypeOf(next).constructor.name)
      return yield CreateUpdate(path, next);
    for (let i = 0;i < Math.min(current.length, next.length); i++) {
      yield* Visit(`${path}/${i}`, current[i], next[i]);
    }
  }
  function* ValueType(path, current, next) {
    if (current === next)
      return;
    yield CreateUpdate(path, next);
  }
  function* Visit(path, current, next) {
    if (ValueGuard.IsPlainObject(current))
      return yield* ObjectType(path, current, next);
    if (ValueGuard.IsArray(current))
      return yield* ArrayType(path, current, next);
    if (ValueGuard.IsTypedArray(current))
      return yield* TypedArrayType(path, current, next);
    if (ValueGuard.IsValueType(current))
      return yield* ValueType(path, current, next);
    throw new ValueDeltaUnableToDiffUnknownValue(current);
  }
  var Diff = function(current, next) {
    return [...Visit("", current, next)];
  };
  var IsRootUpdate = function(edits) {
    return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
  };
  var IsIdentity = function(edits) {
    return edits.length === 0;
  };
  var Patch = function(current, edits) {
    if (IsRootUpdate(edits)) {
      return ValueClone.Clone(edits[0].value);
    }
    if (IsIdentity(edits)) {
      return ValueClone.Clone(current);
    }
    const clone = ValueClone.Clone(current);
    for (const edit of edits) {
      switch (edit.type) {
        case "insert": {
          pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
          break;
        }
        case "update": {
          pointer_1.ValuePointer.Set(clone, edit.path, edit.value);
          break;
        }
        case "delete": {
          pointer_1.ValuePointer.Delete(clone, edit.path);
          break;
        }
      }
    }
    return clone;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Patch = exports.Diff = exports.ValueDeltaUnableToDiffUnknownValue = exports.ValueDeltaObjectWithSymbolKeyError = exports.Edit = exports.Delete = exports.Update = exports.Insert = undefined;
  var typebox_1 = require_typebox();
  var pointer_1 = require_pointer();
  var ValueGuard = require_guard();
  var ValueClone = require_clone();
  exports.Insert = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("insert"),
    path: typebox_1.Type.String(),
    value: typebox_1.Type.Unknown()
  });
  exports.Update = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("update"),
    path: typebox_1.Type.String(),
    value: typebox_1.Type.Unknown()
  });
  exports.Delete = typebox_1.Type.Object({
    type: typebox_1.Type.Literal("delete"),
    path: typebox_1.Type.String()
  });
  exports.Edit = typebox_1.Type.Union([exports.Insert, exports.Update, exports.Delete]);

  class ValueDeltaObjectWithSymbolKeyError extends Error {
    constructor(key) {
      super("ValueDelta: Cannot diff objects with symbol keys");
      this.key = key;
    }
  }
  exports.ValueDeltaObjectWithSymbolKeyError = ValueDeltaObjectWithSymbolKeyError;

  class ValueDeltaUnableToDiffUnknownValue extends Error {
    constructor(value) {
      super("ValueDelta: Unable to create diff edits for unknown value");
      this.value = value;
    }
  }
  exports.ValueDeltaUnableToDiffUnknownValue = ValueDeltaUnableToDiffUnknownValue;
  exports.Diff = Diff;
  exports.Patch = Patch;
});

// node_modules/@sinclair/typebox/value/mutate.js
var require_mutate = __commonJS((exports) => {
  var ObjectType = function(root, path, current, next) {
    if (!ValueGuard.IsPlainObject(current)) {
      pointer_1.ValuePointer.Set(root, path, ValueClone.Clone(next));
    } else {
      const currentKeys = Object.keys(current);
      const nextKeys = Object.keys(next);
      for (const currentKey of currentKeys) {
        if (!nextKeys.includes(currentKey)) {
          delete current[currentKey];
        }
      }
      for (const nextKey of nextKeys) {
        if (!currentKeys.includes(nextKey)) {
          current[nextKey] = null;
        }
      }
      for (const nextKey of nextKeys) {
        Visit(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
      }
    }
  };
  var ArrayType = function(root, path, current, next) {
    if (!ValueGuard.IsArray(current)) {
      pointer_1.ValuePointer.Set(root, path, ValueClone.Clone(next));
    } else {
      for (let index = 0;index < next.length; index++) {
        Visit(root, `${path}/${index}`, current[index], next[index]);
      }
      current.splice(next.length);
    }
  };
  var TypedArrayType = function(root, path, current, next) {
    if (ValueGuard.IsTypedArray(current) && current.length === next.length) {
      for (let i = 0;i < current.length; i++) {
        current[i] = next[i];
      }
    } else {
      pointer_1.ValuePointer.Set(root, path, ValueClone.Clone(next));
    }
  };
  var ValueType = function(root, path, current, next) {
    if (current === next)
      return;
    pointer_1.ValuePointer.Set(root, path, next);
  };
  var Visit = function(root, path, current, next) {
    if (ValueGuard.IsArray(next))
      return ArrayType(root, path, current, next);
    if (ValueGuard.IsTypedArray(next))
      return TypedArrayType(root, path, current, next);
    if (ValueGuard.IsPlainObject(next))
      return ObjectType(root, path, current, next);
    if (ValueGuard.IsValueType(next))
      return ValueType(root, path, current, next);
  };
  var IsNonMutableValue = function(value) {
    return ValueGuard.IsTypedArray(value) || ValueGuard.IsValueType(value);
  };
  var IsMismatchedValue = function(current, next) {
    return ValueGuard.IsPlainObject(current) && ValueGuard.IsArray(next) || ValueGuard.IsArray(current) && ValueGuard.IsPlainObject(next);
  };
  var Mutate = function(current, next) {
    if (IsNonMutableValue(current) || IsNonMutableValue(next))
      throw new ValueMutateInvalidRootMutationError;
    if (IsMismatchedValue(current, next))
      throw new ValueMutateTypeMismatchError;
    Visit(current, "", current, next);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Mutate = exports.ValueMutateInvalidRootMutationError = exports.ValueMutateTypeMismatchError = undefined;
  var pointer_1 = require_pointer();
  var ValueClone = require_clone();
  var ValueGuard = require_guard();

  class ValueMutateTypeMismatchError extends Error {
    constructor() {
      super("ValueMutate: Cannot assign due type mismatch of assignable values");
    }
  }
  exports.ValueMutateTypeMismatchError = ValueMutateTypeMismatchError;

  class ValueMutateInvalidRootMutationError extends Error {
    constructor() {
      super("ValueMutate: Only object and array types can be mutated at the root level");
    }
  }
  exports.ValueMutateInvalidRootMutationError = ValueMutateInvalidRootMutationError;
  exports.Mutate = Mutate;
});

// node_modules/@sinclair/typebox/value/equal.js
var require_equal = __commonJS((exports) => {
  var ObjectType = function(left, right) {
    if (!ValueGuard.IsPlainObject(right))
      return false;
    const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
    const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
    if (leftKeys.length !== rightKeys.length)
      return false;
    return leftKeys.every((key) => Equal(left[key], right[key]));
  };
  var DateType = function(left, right) {
    return ValueGuard.IsDate(right) && left.getTime() === right.getTime();
  };
  var ArrayType = function(left, right) {
    if (!ValueGuard.IsArray(right) || left.length !== right.length)
      return false;
    return left.every((value, index) => Equal(value, right[index]));
  };
  var TypedArrayType = function(left, right) {
    if (!ValueGuard.IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
      return false;
    return left.every((value, index) => Equal(value, right[index]));
  };
  var ValueType = function(left, right) {
    return left === right;
  };
  var Equal = function(left, right) {
    if (ValueGuard.IsPlainObject(left))
      return ObjectType(left, right);
    if (ValueGuard.IsDate(left))
      return DateType(left, right);
    if (ValueGuard.IsTypedArray(left))
      return TypedArrayType(left, right);
    if (ValueGuard.IsArray(left))
      return ArrayType(left, right);
    if (ValueGuard.IsValueType(left))
      return ValueType(left, right);
    throw new Error("ValueEquals: Unable to compare value");
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Equal = undefined;
  var ValueGuard = require_guard();
  exports.Equal = Equal;
});

// node_modules/@sinclair/typebox/value/check.js
var require_check = __commonJS((exports) => {
  var IsAnyOrUnknown = function(schema) {
    return schema[Types.Kind] === "Any" || schema[Types.Kind] === "Unknown";
  };
  var IsDefined = function(value) {
    return value !== undefined;
  };
  var IsExactOptionalProperty = function(value, key) {
    return index_1.TypeSystem.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  };
  var IsObject = function(value) {
    const isObject = ValueGuard.IsObject(value);
    return index_1.TypeSystem.AllowArrayObjects ? isObject : isObject && !ValueGuard.IsArray(value);
  };
  var IsRecordObject = function(value) {
    return IsObject(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  };
  var IsNumber = function(value) {
    const isNumber = ValueGuard.IsNumber(value);
    return index_1.TypeSystem.AllowNaN ? isNumber : isNumber && Number.isFinite(value);
  };
  var IsVoid = function(value) {
    const isUndefined = ValueGuard.IsUndefined(value);
    return index_1.TypeSystem.AllowVoidNull ? isUndefined || value === null : isUndefined;
  };
  var TAny = function(schema, references, value) {
    return true;
  };
  var TArray = function(schema, references, value) {
    if (!Array.isArray(value)) {
      return false;
    }
    if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
      return false;
    }
    if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
      return false;
    }
    if (!value.every((value2) => Visit(schema.items, references, value2))) {
      return false;
    }
    if (schema.uniqueItems === true && !function() {
      const set = new Set;
      for (const element of value) {
        const hashed = ValueHash.Hash(element);
        if (set.has(hashed)) {
          return false;
        } else {
          set.add(hashed);
        }
      }
      return true;
    }()) {
      return false;
    }
    if (!(IsDefined(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
      return true;
    }
    const containsSchema = IsDefined(schema.contains) ? schema.contains : Types.Type.Never();
    const containsCount = value.reduce((acc, value2) => Visit(containsSchema, references, value2) ? acc + 1 : acc, 0);
    if (containsCount === 0) {
      return false;
    }
    if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
      return false;
    }
    if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
      return false;
    }
    return true;
  };
  var TAsyncIterator = function(schema, references, value) {
    return IsObject(value) && (Symbol.asyncIterator in value);
  };
  var TBigInt = function(schema, references, value) {
    if (!ValueGuard.IsBigInt(value)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    return true;
  };
  var TBoolean = function(schema, references, value) {
    return typeof value === "boolean";
  };
  var TConstructor = function(schema, references, value) {
    return Visit(schema.returns, references, value.prototype);
  };
  var TDate = function(schema, references, value) {
    if (!(value instanceof Date)) {
      return false;
    }
    if (!IsNumber(value.getTime())) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
      return false;
    }
    if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
      return false;
    }
    return true;
  };
  var TFunction = function(schema, references, value) {
    return typeof value === "function";
  };
  var TInteger = function(schema, references, value) {
    if (!ValueGuard.IsInteger(value)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    return true;
  };
  var TIntersect = function(schema, references, value) {
    const check1 = schema.allOf.every((schema2) => Visit(schema2, references, value));
    if (schema.unevaluatedProperties === false) {
      const keyPattern = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      const check2 = Object.getOwnPropertyNames(value).every((key) => keyPattern.test(key));
      return check1 && check2;
    } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
      const keyCheck = new RegExp(Types.KeyResolver.ResolvePattern(schema));
      const check2 = Object.getOwnPropertyNames(value).every((key) => keyCheck.test(key) || Visit(schema.unevaluatedProperties, references, value[key]));
      return check1 && check2;
    } else {
      return check1;
    }
  };
  var TIterator = function(schema, references, value) {
    return IsObject(value) && (Symbol.iterator in value);
  };
  var TLiteral = function(schema, references, value) {
    return value === schema.const;
  };
  var TNever = function(schema, references, value) {
    return false;
  };
  var TNot = function(schema, references, value) {
    return !Visit(schema.not, references, value);
  };
  var TNull = function(schema, references, value) {
    return value === null;
  };
  var TNumber = function(schema, references, value) {
    if (!IsNumber(value)) {
      return false;
    }
    if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
      return false;
    }
    if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
      return false;
    }
    if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
      return false;
    }
    if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
      return false;
    }
    return true;
  };
  var TObject = function(schema, references, value) {
    if (!IsObject(value)) {
      return false;
    }
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      return false;
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      return false;
    }
    const knownKeys = Object.getOwnPropertyNames(schema.properties);
    for (const knownKey of knownKeys) {
      const property = schema.properties[knownKey];
      if (schema.required && schema.required.includes(knownKey)) {
        if (!Visit(property, references, value[knownKey])) {
          return false;
        }
        if ((Types.ExtendsUndefined.Check(property) || IsAnyOrUnknown(property)) && !(knownKey in value)) {
          return false;
        }
      } else {
        if (IsExactOptionalProperty(value, knownKey) && !Visit(property, references, value[knownKey])) {
          return false;
        }
      }
    }
    if (schema.additionalProperties === false) {
      const valueKeys = Object.getOwnPropertyNames(value);
      if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
        return true;
      } else {
        return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
      }
    } else if (typeof schema.additionalProperties === "object") {
      const valueKeys = Object.getOwnPropertyNames(value);
      return valueKeys.every((key) => knownKeys.includes(key) || Visit(schema.additionalProperties, references, value[key]));
    } else {
      return true;
    }
  };
  var TPromise = function(schema, references, value) {
    return typeof value === "object" && typeof value.then === "function";
  };
  var TRecord = function(schema, references, value) {
    if (!IsRecordObject(value)) {
      return false;
    }
    if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
      return false;
    }
    if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
      return false;
    }
    const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
    const regex = new RegExp(patternKey);
    return Object.entries(value).every(([key, value2]) => {
      if (regex.test(key)) {
        return Visit(patternSchema, references, value2);
      }
      if (typeof schema.additionalProperties === "object") {
        return Visit(schema.additionalProperties, references, value2);
      }
      if (schema.additionalProperties === false) {
        return false;
      }
      return true;
    });
  };
  var TRef = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueCheckDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TString = function(schema, references, value) {
    if (!ValueGuard.IsString(value)) {
      return false;
    }
    if (IsDefined(schema.minLength)) {
      if (!(value.length >= schema.minLength))
        return false;
    }
    if (IsDefined(schema.maxLength)) {
      if (!(value.length <= schema.maxLength))
        return false;
    }
    if (IsDefined(schema.pattern)) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value))
        return false;
    }
    if (IsDefined(schema.format)) {
      if (!Types.FormatRegistry.Has(schema.format))
        return false;
      const func = Types.FormatRegistry.Get(schema.format);
      return func(value);
    }
    return true;
  };
  var TSymbol = function(schema, references, value) {
    if (!(typeof value === "symbol")) {
      return false;
    }
    return true;
  };
  var TTemplateLiteral = function(schema, references, value) {
    if (!ValueGuard.IsString(value)) {
      return false;
    }
    return new RegExp(schema.pattern).test(value);
  };
  var TThis = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueCheckDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TTuple = function(schema, references, value) {
    if (!ValueGuard.IsArray(value)) {
      return false;
    }
    if (schema.items === undefined && !(value.length === 0)) {
      return false;
    }
    if (!(value.length === schema.maxItems)) {
      return false;
    }
    if (!schema.items) {
      return true;
    }
    for (let i = 0;i < schema.items.length; i++) {
      if (!Visit(schema.items[i], references, value[i]))
        return false;
    }
    return true;
  };
  var TUndefined = function(schema, references, value) {
    return value === undefined;
  };
  var TUnion = function(schema, references, value) {
    return schema.anyOf.some((inner) => Visit(inner, references, value));
  };
  var TUint8Array = function(schema, references, value) {
    if (!(value instanceof Uint8Array)) {
      return false;
    }
    if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
      return false;
    }
    if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
      return false;
    }
    return true;
  };
  var TUnknown = function(schema, references, value) {
    return true;
  };
  var TVoid = function(schema, references, value) {
    return IsVoid(value);
  };
  var TKind = function(schema, references, value) {
    if (!Types.TypeRegistry.Has(schema[Types.Kind]))
      return false;
    const func = Types.TypeRegistry.Get(schema[Types.Kind]);
    return func(schema, value);
  };
  var Visit = function(schema, references, value) {
    const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_, value);
      case "Array":
        return TArray(schema_, references_, value);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_, value);
      case "BigInt":
        return TBigInt(schema_, references_, value);
      case "Boolean":
        return TBoolean(schema_, references_, value);
      case "Constructor":
        return TConstructor(schema_, references_, value);
      case "Date":
        return TDate(schema_, references_, value);
      case "Function":
        return TFunction(schema_, references_, value);
      case "Integer":
        return TInteger(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Iterator":
        return TIterator(schema_, references_, value);
      case "Literal":
        return TLiteral(schema_, references_, value);
      case "Never":
        return TNever(schema_, references_, value);
      case "Not":
        return TNot(schema_, references_, value);
      case "Null":
        return TNull(schema_, references_, value);
      case "Number":
        return TNumber(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Promise":
        return TPromise(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "String":
        return TString(schema_, references_, value);
      case "Symbol":
        return TSymbol(schema_, references_, value);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Undefined":
        return TUndefined(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Uint8Array":
        return TUint8Array(schema_, references_, value);
      case "Unknown":
        return TUnknown(schema_, references_, value);
      case "Void":
        return TVoid(schema_, references_, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCheckUnknownTypeError(schema_);
        return TKind(schema_, references_, value);
    }
  };
  var Check = function(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Check = exports.ValueCheckDereferenceError = exports.ValueCheckUnknownTypeError = undefined;
  var index_1 = require_system2();
  var Types = require_typebox();
  var ValueGuard = require_guard();
  var ValueHash = require_hash();

  class ValueCheckUnknownTypeError extends Error {
    constructor(schema) {
      super(`ValueCheck: ${schema[Types.Kind] ? `Unknown type '${schema[Types.Kind]}'` : "Unknown type"}`);
      this.schema = schema;
    }
  }
  exports.ValueCheckUnknownTypeError = ValueCheckUnknownTypeError;

  class ValueCheckDereferenceError extends Error {
    constructor(schema) {
      super(`ValueCheck: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueCheckDereferenceError = ValueCheckDereferenceError;
  exports.Check = Check;
});

// node_modules/@sinclair/typebox/value/create.js
var require_create = __commonJS((exports) => {
  var TAny = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return {};
    }
  };
  var TArray = function(schema, references) {
    if (schema.uniqueItems === true && !ValueGuard.HasPropertyKey(schema, "default")) {
      throw new Error("ValueCreate.Array: Array with the uniqueItems constraint requires a default value");
    } else if (("contains" in schema) && !ValueGuard.HasPropertyKey(schema, "default")) {
      throw new Error("ValueCreate.Array: Array with the contains constraint requires a default value");
    } else if ("default" in schema) {
      return schema.default;
    } else if (schema.minItems !== undefined) {
      return Array.from({ length: schema.minItems }).map((item) => {
        return Visit(schema.items, references);
      });
    } else {
      return [];
    }
  };
  var TAsyncIterator = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return async function* () {
      }();
    }
  };
  var TBigInt = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return BigInt(0);
    }
  };
  var TBoolean = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return false;
    }
  };
  var TConstructor = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      const value = Visit(schema.returns, references);
      if (typeof value === "object" && !Array.isArray(value)) {
        return class {
          constructor() {
            for (const [key, val] of Object.entries(value)) {
              const self = this;
              self[key] = val;
            }
          }
        };
      } else {
        return class {
        };
      }
    }
  };
  var TDate = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.minimumTimestamp !== undefined) {
      return new Date(schema.minimumTimestamp);
    } else {
      return new Date(0);
    }
  };
  var TFunction = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return () => Visit(schema.returns, references);
    }
  };
  var TInteger = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.minimum !== undefined) {
      return schema.minimum;
    } else {
      return 0;
    }
  };
  var TIntersect = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      const value = schema.allOf.reduce((acc, schema2) => {
        const next = Visit(schema2, references);
        return typeof next === "object" ? { ...acc, ...next } : next;
      }, {});
      if (!ValueCheck.Check(schema, references, value))
        throw new ValueCreateIntersectTypeError(schema);
      return value;
    }
  };
  var TIterator = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return function* () {
      }();
    }
  };
  var TLiteral = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return schema.const;
    }
  };
  var TNever = function(schema, references) {
    throw new ValueCreateNeverTypeError(schema);
  };
  var TNot = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      throw new ValueCreateNotTypeError(schema);
    }
  };
  var TNull = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return null;
    }
  };
  var TNumber = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.minimum !== undefined) {
      return schema.minimum;
    } else {
      return 0;
    }
  };
  var TObject = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      const required = new Set(schema.required);
      return schema.default || Object.entries(schema.properties).reduce((acc, [key, schema2]) => {
        return required.has(key) ? { ...acc, [key]: Visit(schema2, references) } : { ...acc };
      }, {});
    }
  };
  var TPromise = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return Promise.resolve(Visit(schema.item, references));
    }
  };
  var TRecord = function(schema, references) {
    const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (!(keyPattern === Types.PatternStringExact || keyPattern === Types.PatternNumberExact)) {
      const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
      return propertyKeys.reduce((acc, key) => {
        return { ...acc, [key]: Visit(valueSchema, references) };
      }, {});
    } else {
      return {};
    }
  };
  var TRef = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
      if (index === -1)
        throw new ValueCreateDereferenceError(schema);
      const target = references[index];
      return Visit(target, references);
    }
  };
  var TString = function(schema, references) {
    if (schema.pattern !== undefined) {
      if (!ValueGuard.HasPropertyKey(schema, "default")) {
        throw new Error("ValueCreate.String: String types with patterns must specify a default value");
      } else {
        return schema.default;
      }
    } else if (schema.format !== undefined) {
      if (!ValueGuard.HasPropertyKey(schema, "default")) {
        throw new Error("ValueCreate.String: String types with formats must specify a default value");
      } else {
        return schema.default;
      }
    } else {
      if (ValueGuard.HasPropertyKey(schema, "default")) {
        return schema.default;
      } else if (schema.minLength !== undefined) {
        return Array.from({ length: schema.minLength }).map(() => ".").join("");
      } else {
        return "";
      }
    }
  };
  var TSymbol = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if ("value" in schema) {
      return Symbol.for(schema.value);
    } else {
      return Symbol();
    }
  };
  var TTemplateLiteral = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    }
    const expression = Types.TemplateLiteralParser.ParseExact(schema.pattern);
    if (!Types.TemplateLiteralFinite.Check(expression))
      throw new ValueCreateTempateLiteralTypeError(schema);
    const sequence = Types.TemplateLiteralGenerator.Generate(expression);
    return sequence.next().value;
  };
  var TThis = function(schema, references) {
    if (recursiveDepth++ > recursiveMaxDepth)
      throw new ValueCreateRecursiveInstantiationError(schema, recursiveMaxDepth);
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
      if (index === -1)
        throw new ValueCreateDereferenceError(schema);
      const target = references[index];
      return Visit(target, references);
    }
  };
  var TTuple = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    }
    if (schema.items === undefined) {
      return [];
    } else {
      return Array.from({ length: schema.minItems }).map((_, index) => Visit(schema.items[index], references));
    }
  };
  var TUndefined = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return;
    }
  };
  var TUnion = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.anyOf.length === 0) {
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    } else {
      return Visit(schema.anyOf[0], references);
    }
  };
  var TUint8Array = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else if (schema.minByteLength !== undefined) {
      return new Uint8Array(schema.minByteLength);
    } else {
      return new Uint8Array(0);
    }
  };
  var TUnknown = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return {};
    }
  };
  var TVoid = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      return;
    }
  };
  var TKind = function(schema, references) {
    if (ValueGuard.HasPropertyKey(schema, "default")) {
      return schema.default;
    } else {
      throw new Error("ValueCreate: User defined types must specify a default value");
    }
  };
  var Visit = function(schema, references) {
    const references_ = ValueGuard.IsString(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema_[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_);
      case "Array":
        return TArray(schema_, references_);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_);
      case "BigInt":
        return TBigInt(schema_, references_);
      case "Boolean":
        return TBoolean(schema_, references_);
      case "Constructor":
        return TConstructor(schema_, references_);
      case "Date":
        return TDate(schema_, references_);
      case "Function":
        return TFunction(schema_, references_);
      case "Integer":
        return TInteger(schema_, references_);
      case "Intersect":
        return TIntersect(schema_, references_);
      case "Iterator":
        return TIterator(schema_, references_);
      case "Literal":
        return TLiteral(schema_, references_);
      case "Never":
        return TNever(schema_, references_);
      case "Not":
        return TNot(schema_, references_);
      case "Null":
        return TNull(schema_, references_);
      case "Number":
        return TNumber(schema_, references_);
      case "Object":
        return TObject(schema_, references_);
      case "Promise":
        return TPromise(schema_, references_);
      case "Record":
        return TRecord(schema_, references_);
      case "Ref":
        return TRef(schema_, references_);
      case "String":
        return TString(schema_, references_);
      case "Symbol":
        return TSymbol(schema_, references_);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_);
      case "This":
        return TThis(schema_, references_);
      case "Tuple":
        return TTuple(schema_, references_);
      case "Undefined":
        return TUndefined(schema_, references_);
      case "Union":
        return TUnion(schema_, references_);
      case "Uint8Array":
        return TUint8Array(schema_, references_);
      case "Unknown":
        return TUnknown(schema_, references_);
      case "Void":
        return TVoid(schema_, references_);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCreateUnknownTypeError(schema_);
        return TKind(schema_, references_);
    }
  };
  var Create = function(...args) {
    recursiveDepth = 0;
    return args.length === 2 ? Visit(args[0], args[1]) : Visit(args[0], []);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Create = exports.ValueCreateRecursiveInstantiationError = exports.ValueCreateDereferenceError = exports.ValueCreateTempateLiteralTypeError = exports.ValueCreateIntersectTypeError = exports.ValueCreateNotTypeError = exports.ValueCreateNeverTypeError = exports.ValueCreateUnknownTypeError = undefined;
  var Types = require_typebox();
  var ValueCheck = require_check();
  var ValueGuard = require_guard();

  class ValueCreateUnknownTypeError extends Error {
    constructor(schema) {
      super("ValueCreate: Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueCreateUnknownTypeError = ValueCreateUnknownTypeError;

  class ValueCreateNeverTypeError extends Error {
    constructor(schema) {
      super("ValueCreate: Never types cannot be created");
      this.schema = schema;
    }
  }
  exports.ValueCreateNeverTypeError = ValueCreateNeverTypeError;

  class ValueCreateNotTypeError extends Error {
    constructor(schema) {
      super("ValueCreate: Not types must have a default value");
      this.schema = schema;
    }
  }
  exports.ValueCreateNotTypeError = ValueCreateNotTypeError;

  class ValueCreateIntersectTypeError extends Error {
    constructor(schema) {
      super("ValueCreate: Intersect produced invalid value. Consider using a default value.");
      this.schema = schema;
    }
  }
  exports.ValueCreateIntersectTypeError = ValueCreateIntersectTypeError;

  class ValueCreateTempateLiteralTypeError extends Error {
    constructor(schema) {
      super("ValueCreate: Can only create template literal values from patterns that produce finite sequences. Consider using a default value.");
      this.schema = schema;
    }
  }
  exports.ValueCreateTempateLiteralTypeError = ValueCreateTempateLiteralTypeError;

  class ValueCreateDereferenceError extends Error {
    constructor(schema) {
      super(`ValueCreate: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueCreateDereferenceError = ValueCreateDereferenceError;

  class ValueCreateRecursiveInstantiationError extends Error {
    constructor(schema, recursiveMaxDepth2) {
      super("ValueCreate: Value cannot be created as recursive type may produce value of infinite size. Consider using a default.");
      this.schema = schema;
      this.recursiveMaxDepth = recursiveMaxDepth2;
    }
  }
  exports.ValueCreateRecursiveInstantiationError = ValueCreateRecursiveInstantiationError;
  var recursiveMaxDepth = 512;
  var recursiveDepth = 0;
  exports.Create = Create;
});

// node_modules/@sinclair/typebox/value/cast.js
var require_cast = __commonJS((exports) => {
  var TAny = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TArray = function(schema, references, value) {
    if (ValueCheck.Check(schema, references, value))
      return ValueClone.Clone(value);
    const created = ValueGuard.IsArray(value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
    const minimum = ValueGuard.IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
    const maximum = ValueGuard.IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
    const casted = maximum.map((value2) => Visit(schema.items, references, value2));
    if (schema.uniqueItems !== true)
      return casted;
    const unique = [...new Set(casted)];
    if (!ValueCheck.Check(schema, references, unique))
      throw new ValueCastArrayUniqueItemsTypeError(schema, unique);
    return unique;
  };
  var TAsyncIterator = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TBigInt = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TBoolean = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TConstructor = function(schema, references, value) {
    if (ValueCheck.Check(schema, references, value))
      return ValueCreate.Create(schema, references);
    const required = new Set(schema.returns.required || []);
    const result = function() {
    };
    for (const [key, property] of Object.entries(schema.returns.properties)) {
      if (!required.has(key) && value.prototype[key] === undefined)
        continue;
      result.prototype[key] = Visit(property, references, value.prototype[key]);
    }
    return result;
  };
  var TDate = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TFunction = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TInteger = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TIntersect = function(schema, references, value) {
    const created = ValueCreate.Create(schema, references);
    const mapped = ValueGuard.IsPlainObject(created) && ValueGuard.IsPlainObject(value) ? { ...created, ...value } : value;
    return ValueCheck.Check(schema, references, mapped) ? mapped : ValueCreate.Create(schema, references);
  };
  var TIterator = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TLiteral = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TNever = function(schema, references, value) {
    throw new ValueCastNeverTypeError(schema);
  };
  var TNot = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TNull = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TNumber = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TObject = function(schema, references, value) {
    if (ValueCheck.Check(schema, references, value))
      return value;
    if (value === null || typeof value !== "object")
      return ValueCreate.Create(schema, references);
    const required = new Set(schema.required || []);
    const result = {};
    for (const [key, property] of Object.entries(schema.properties)) {
      if (!required.has(key) && value[key] === undefined)
        continue;
      result[key] = Visit(property, references, value[key]);
    }
    if (typeof schema.additionalProperties === "object") {
      const propertyNames = Object.getOwnPropertyNames(schema.properties);
      for (const propertyName of Object.getOwnPropertyNames(value)) {
        if (propertyNames.includes(propertyName))
          continue;
        result[propertyName] = Visit(schema.additionalProperties, references, value[propertyName]);
      }
    }
    return result;
  };
  var TPromise = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TRecord = function(schema, references, value) {
    if (ValueCheck.Check(schema, references, value))
      return ValueClone.Clone(value);
    if (value === null || typeof value !== "object" || Array.isArray(value) || value instanceof Date)
      return ValueCreate.Create(schema, references);
    const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
    const subschema = schema.patternProperties[subschemaPropertyName];
    const result = {};
    for (const [propKey, propValue] of Object.entries(value)) {
      result[propKey] = Visit(subschema, references, propValue);
    }
    return result;
  };
  var TRef = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueCastDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TString = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? value : ValueCreate.Create(schema, references);
  };
  var TSymbol = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TTemplateLiteral = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TThis = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueCastDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TTuple = function(schema, references, value) {
    if (ValueCheck.Check(schema, references, value))
      return ValueClone.Clone(value);
    if (!ValueGuard.IsArray(value))
      return ValueCreate.Create(schema, references);
    if (schema.items === undefined)
      return [];
    return schema.items.map((schema2, index) => Visit(schema2, references, value[index]));
  };
  var TUndefined = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TUnion = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : UnionCastCreate.Create(schema, references, value);
  };
  var TUint8Array = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TUnknown = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TVoid = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var TKind = function(schema, references, value) {
    return ValueCheck.Check(schema, references, value) ? ValueClone.Clone(value) : ValueCreate.Create(schema, references);
  };
  var Visit = function(schema, references, value) {
    const references_ = ValueGuard.IsString(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_, value);
      case "Array":
        return TArray(schema_, references_, value);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_, value);
      case "BigInt":
        return TBigInt(schema_, references_, value);
      case "Boolean":
        return TBoolean(schema_, references_, value);
      case "Constructor":
        return TConstructor(schema_, references_, value);
      case "Date":
        return TDate(schema_, references_, value);
      case "Function":
        return TFunction(schema_, references_, value);
      case "Integer":
        return TInteger(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Iterator":
        return TIterator(schema_, references_, value);
      case "Literal":
        return TLiteral(schema_, references_, value);
      case "Never":
        return TNever(schema_, references_, value);
      case "Not":
        return TNot(schema_, references_, value);
      case "Null":
        return TNull(schema_, references_, value);
      case "Number":
        return TNumber(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Promise":
        return TPromise(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "String":
        return TString(schema_, references_, value);
      case "Symbol":
        return TSymbol(schema_, references_, value);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Undefined":
        return TUndefined(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Uint8Array":
        return TUint8Array(schema_, references_, value);
      case "Unknown":
        return TUnknown(schema_, references_, value);
      case "Void":
        return TVoid(schema_, references_, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueCastUnknownTypeError(schema_);
        return TKind(schema_, references_, value);
    }
  };
  var Cast = function(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Cast = exports.ValueCastDereferenceError = exports.ValueCastUnknownTypeError = exports.ValueCastRecursiveTypeError = exports.ValueCastNeverTypeError = exports.ValueCastArrayUniqueItemsTypeError = exports.ValueCastReferenceTypeError = undefined;
  var Types = require_typebox();
  var ValueCreate = require_create();
  var ValueCheck = require_check();
  var ValueClone = require_clone();
  var ValueGuard = require_guard();

  class ValueCastReferenceTypeError extends Error {
    constructor(schema) {
      super(`ValueCast: Cannot locate referenced schema with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueCastReferenceTypeError = ValueCastReferenceTypeError;

  class ValueCastArrayUniqueItemsTypeError extends Error {
    constructor(schema, value) {
      super("ValueCast: Array cast produced invalid data due to uniqueItems constraint");
      this.schema = schema;
      this.value = value;
    }
  }
  exports.ValueCastArrayUniqueItemsTypeError = ValueCastArrayUniqueItemsTypeError;

  class ValueCastNeverTypeError extends Error {
    constructor(schema) {
      super("ValueCast: Never types cannot be cast");
      this.schema = schema;
    }
  }
  exports.ValueCastNeverTypeError = ValueCastNeverTypeError;

  class ValueCastRecursiveTypeError extends Error {
    constructor(schema) {
      super("ValueCast.Recursive: Cannot cast recursive schemas");
      this.schema = schema;
    }
  }
  exports.ValueCastRecursiveTypeError = ValueCastRecursiveTypeError;

  class ValueCastUnknownTypeError extends Error {
    constructor(schema) {
      super("ValueCast: Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueCastUnknownTypeError = ValueCastUnknownTypeError;

  class ValueCastDereferenceError extends Error {
    constructor(schema) {
      super(`ValueCast: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueCastDereferenceError = ValueCastDereferenceError;
  var UnionCastCreate;
  (function(UnionCastCreate2) {
    function Score(schema, references, value) {
      if (schema[Types.Kind] === "Object" && typeof value === "object" && !ValueGuard.IsNull(value)) {
        const object = schema;
        const keys = Object.getOwnPropertyNames(value);
        const entries = Object.entries(object.properties);
        const [point, max] = [1 / entries.length, entries.length];
        return entries.reduce((acc, [key, schema2]) => {
          const literal = schema2[Types.Kind] === "Literal" && schema2.const === value[key] ? max : 0;
          const checks = ValueCheck.Check(schema2, references, value[key]) ? point : 0;
          const exists = keys.includes(key) ? point : 0;
          return acc + (literal + checks + exists);
        }, 0);
      } else {
        return ValueCheck.Check(schema, references, value) ? 1 : 0;
      }
    }
    function Select(union, references, value) {
      let [select, best] = [union.anyOf[0], 0];
      for (const schema of union.anyOf) {
        const score = Score(schema, references, value);
        if (score > best) {
          select = schema;
          best = score;
        }
      }
      return select;
    }
    function Create(union, references, value) {
      if ("default" in union) {
        return union.default;
      } else {
        const schema = Select(union, references, value);
        return Cast(schema, references, value);
      }
    }
    UnionCastCreate2.Create = Create;
  })(UnionCastCreate || (UnionCastCreate = {}));
  exports.Cast = Cast;
});

// node_modules/@sinclair/typebox/value/convert.js
var require_convert = __commonJS((exports) => {
  var IsStringNumeric = function(value) {
    return ValueGuard.IsString(value) && !isNaN(value) && !isNaN(parseFloat(value));
  };
  var IsValueToString = function(value) {
    return ValueGuard.IsBigInt(value) || ValueGuard.IsBoolean(value) || ValueGuard.IsNumber(value);
  };
  var IsValueTrue = function(value) {
    return value === true || ValueGuard.IsNumber(value) && value === 1 || ValueGuard.IsBigInt(value) && value === BigInt("1") || ValueGuard.IsString(value) && (value.toLowerCase() === "true" || value === "1");
  };
  var IsValueFalse = function(value) {
    return value === false || ValueGuard.IsNumber(value) && value === 0 || ValueGuard.IsBigInt(value) && value === BigInt("0") || ValueGuard.IsString(value) && (value.toLowerCase() === "false" || value === "0");
  };
  var IsTimeStringWithTimeZone = function(value) {
    return ValueGuard.IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
  };
  var IsTimeStringWithoutTimeZone = function(value) {
    return ValueGuard.IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
  };
  var IsDateTimeStringWithTimeZone = function(value) {
    return ValueGuard.IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
  };
  var IsDateTimeStringWithoutTimeZone = function(value) {
    return ValueGuard.IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
  };
  var IsDateString = function(value) {
    return ValueGuard.IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value);
  };
  var TryConvertLiteralString = function(value, target) {
    const conversion = TryConvertString(value);
    return conversion === target ? conversion : value;
  };
  var TryConvertLiteralNumber = function(value, target) {
    const conversion = TryConvertNumber(value);
    return conversion === target ? conversion : value;
  };
  var TryConvertLiteralBoolean = function(value, target) {
    const conversion = TryConvertBoolean(value);
    return conversion === target ? conversion : value;
  };
  var TryConvertLiteral = function(schema, value) {
    if (typeof schema.const === "string") {
      return TryConvertLiteralString(value, schema.const);
    } else if (typeof schema.const === "number") {
      return TryConvertLiteralNumber(value, schema.const);
    } else if (typeof schema.const === "boolean") {
      return TryConvertLiteralBoolean(value, schema.const);
    } else {
      return ValueClone.Clone(value);
    }
  };
  var TryConvertBoolean = function(value) {
    return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
  };
  var TryConvertBigInt = function(value) {
    return IsStringNumeric(value) ? BigInt(parseInt(value)) : ValueGuard.IsNumber(value) ? BigInt(value | 0) : IsValueFalse(value) ? 0 : IsValueTrue(value) ? 1 : value;
  };
  var TryConvertString = function(value) {
    return IsValueToString(value) ? value.toString() : ValueGuard.IsSymbol(value) && value.description !== undefined ? value.description.toString() : value;
  };
  var TryConvertNumber = function(value) {
    return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
  };
  var TryConvertInteger = function(value) {
    return IsStringNumeric(value) ? parseInt(value) : ValueGuard.IsNumber(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
  };
  var TryConvertNull = function(value) {
    return ValueGuard.IsString(value) && value.toLowerCase() === "null" ? null : value;
  };
  var TryConvertUndefined = function(value) {
    return ValueGuard.IsString(value) && value === "undefined" ? undefined : value;
  };
  var TryConvertDate = function(value) {
    return ValueGuard.IsDate(value) ? value : ValueGuard.IsNumber(value) ? new Date(value) : IsValueTrue(value) ? new Date(1) : IsValueFalse(value) ? new Date(0) : IsStringNumeric(value) ? new Date(parseInt(value)) : IsTimeStringWithoutTimeZone(value) ? new Date(`1970-01-01T${value}.000Z`) : IsTimeStringWithTimeZone(value) ? new Date(`1970-01-01T${value}`) : IsDateTimeStringWithoutTimeZone(value) ? new Date(`${value}.000Z`) : IsDateTimeStringWithTimeZone(value) ? new Date(value) : IsDateString(value) ? new Date(`${value}T00:00:00.000Z`) : value;
  };
  var TAny = function(schema, references, value) {
    return value;
  };
  var TArray = function(schema, references, value) {
    if (ValueGuard.IsArray(value)) {
      return value.map((value2) => Visit(schema.items, references, value2));
    }
    return value;
  };
  var TAsyncIterator = function(schema, references, value) {
    return value;
  };
  var TBigInt = function(schema, references, value) {
    return TryConvertBigInt(value);
  };
  var TBoolean = function(schema, references, value) {
    return TryConvertBoolean(value);
  };
  var TConstructor = function(schema, references, value) {
    return ValueClone.Clone(value);
  };
  var TDate = function(schema, references, value) {
    return TryConvertDate(value);
  };
  var TFunction = function(schema, references, value) {
    return value;
  };
  var TInteger = function(schema, references, value) {
    return TryConvertInteger(value);
  };
  var TIntersect = function(schema, references, value) {
    return value;
  };
  var TIterator = function(schema, references, value) {
    return value;
  };
  var TLiteral = function(schema, references, value) {
    return TryConvertLiteral(schema, value);
  };
  var TNever = function(schema, references, value) {
    return value;
  };
  var TNull = function(schema, references, value) {
    return TryConvertNull(value);
  };
  var TNumber = function(schema, references, value) {
    return TryConvertNumber(value);
  };
  var TObject = function(schema, references, value) {
    if (ValueGuard.IsObject(value))
      return Object.getOwnPropertyNames(schema.properties).reduce((acc, key) => {
        return value[key] !== undefined ? { ...acc, [key]: Visit(schema.properties[key], references, value[key]) } : { ...acc };
      }, value);
    return value;
  };
  var TPromise = function(schema, references, value) {
    return value;
  };
  var TRecord = function(schema, references, value) {
    const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
    const property = schema.patternProperties[propertyKey];
    const result = {};
    for (const [propKey, propValue] of Object.entries(value)) {
      result[propKey] = Visit(property, references, propValue);
    }
    return result;
  };
  var TRef = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueConvertDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TString = function(schema, references, value) {
    return TryConvertString(value);
  };
  var TSymbol = function(schema, references, value) {
    return value;
  };
  var TTemplateLiteral = function(schema, references, value) {
    return value;
  };
  var TThis = function(schema, references, value) {
    const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
    if (index === -1)
      throw new ValueConvertDereferenceError(schema);
    const target = references[index];
    return Visit(target, references, value);
  };
  var TTuple = function(schema, references, value) {
    if (ValueGuard.IsArray(value) && !ValueGuard.IsUndefined(schema.items)) {
      return value.map((value2, index) => {
        return index < schema.items.length ? Visit(schema.items[index], references, value2) : value2;
      });
    }
    return value;
  };
  var TUndefined = function(schema, references, value) {
    return TryConvertUndefined(value);
  };
  var TUnion = function(schema, references, value) {
    for (const subschema of schema.anyOf) {
      const converted = Visit(subschema, references, value);
      if (ValueCheck.Check(subschema, references, converted)) {
        return converted;
      }
    }
    return value;
  };
  var TUint8Array = function(schema, references, value) {
    return value;
  };
  var TUnknown = function(schema, references, value) {
    return value;
  };
  var TVoid = function(schema, references, value) {
    return value;
  };
  var TKind = function(schema, references, value) {
    return value;
  };
  var Visit = function(schema, references, value) {
    const references_ = ValueGuard.IsString(schema.$id) ? [...references, schema] : references;
    const schema_ = schema;
    switch (schema[Types.Kind]) {
      case "Any":
        return TAny(schema_, references_, value);
      case "Array":
        return TArray(schema_, references_, value);
      case "AsyncIterator":
        return TAsyncIterator(schema_, references_, value);
      case "BigInt":
        return TBigInt(schema_, references_, value);
      case "Boolean":
        return TBoolean(schema_, references_, value);
      case "Constructor":
        return TConstructor(schema_, references_, value);
      case "Date":
        return TDate(schema_, references_, value);
      case "Function":
        return TFunction(schema_, references_, value);
      case "Integer":
        return TInteger(schema_, references_, value);
      case "Intersect":
        return TIntersect(schema_, references_, value);
      case "Iterator":
        return TIterator(schema_, references_, value);
      case "Literal":
        return TLiteral(schema_, references_, value);
      case "Never":
        return TNever(schema_, references_, value);
      case "Null":
        return TNull(schema_, references_, value);
      case "Number":
        return TNumber(schema_, references_, value);
      case "Object":
        return TObject(schema_, references_, value);
      case "Promise":
        return TPromise(schema_, references_, value);
      case "Record":
        return TRecord(schema_, references_, value);
      case "Ref":
        return TRef(schema_, references_, value);
      case "String":
        return TString(schema_, references_, value);
      case "Symbol":
        return TSymbol(schema_, references_, value);
      case "TemplateLiteral":
        return TTemplateLiteral(schema_, references_, value);
      case "This":
        return TThis(schema_, references_, value);
      case "Tuple":
        return TTuple(schema_, references_, value);
      case "Undefined":
        return TUndefined(schema_, references_, value);
      case "Union":
        return TUnion(schema_, references_, value);
      case "Uint8Array":
        return TUint8Array(schema_, references_, value);
      case "Unknown":
        return TUnknown(schema_, references_, value);
      case "Void":
        return TVoid(schema_, references_, value);
      default:
        if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
          throw new ValueConvertUnknownTypeError(schema_);
        return TKind(schema_, references_, value);
    }
  };
  var Convert = function(...args) {
    return args.length === 3 ? Visit(args[0], args[1], args[2]) : Visit(args[0], [], args[1]);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Convert = exports.ValueConvertDereferenceError = exports.ValueConvertUnknownTypeError = undefined;
  var Types = require_typebox();
  var ValueClone = require_clone();
  var ValueCheck = require_check();
  var ValueGuard = require_guard();

  class ValueConvertUnknownTypeError extends Error {
    constructor(schema) {
      super("ValueConvert: Unknown type");
      this.schema = schema;
    }
  }
  exports.ValueConvertUnknownTypeError = ValueConvertUnknownTypeError;

  class ValueConvertDereferenceError extends Error {
    constructor(schema) {
      super(`ValueConvert: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.ValueConvertDereferenceError = ValueConvertDereferenceError;
  exports.Convert = Convert;
});

// node_modules/@sinclair/typebox/value/value.js
var require_value = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Value = undefined;
  var ValueErrors = require_errors2();
  var ValueMutate = require_mutate();
  var ValueHash = require_hash();
  var ValueEqual = require_equal();
  var ValueCast = require_cast();
  var ValueClone = require_clone();
  var ValueConvert = require_convert();
  var ValueCreate = require_create();
  var ValueCheck = require_check();
  var ValueDelta = require_delta();
  var Value;
  (function(Value2) {
    function Cast(...args) {
      return ValueCast.Cast.apply(ValueCast, args);
    }
    Value2.Cast = Cast;
    function Create(...args) {
      return ValueCreate.Create.apply(ValueCreate, args);
    }
    Value2.Create = Create;
    function Check(...args) {
      return ValueCheck.Check.apply(ValueCheck, args);
    }
    Value2.Check = Check;
    function Convert(...args) {
      return ValueConvert.Convert.apply(ValueConvert, args);
    }
    Value2.Convert = Convert;
    function Clone(value) {
      return ValueClone.Clone(value);
    }
    Value2.Clone = Clone;
    function Errors(...args) {
      return ValueErrors.Errors.apply(ValueErrors, args);
    }
    Value2.Errors = Errors;
    function Equal(left, right) {
      return ValueEqual.Equal(left, right);
    }
    Value2.Equal = Equal;
    function Diff(current, next) {
      return ValueDelta.Diff(current, next);
    }
    Value2.Diff = Diff;
    function Hash(value) {
      return ValueHash.Hash(value);
    }
    Value2.Hash = Hash;
    function Patch(current, edits) {
      return ValueDelta.Patch(current, edits);
    }
    Value2.Patch = Patch;
    function Mutate(current, next) {
      ValueMutate.Mutate(current, next);
    }
    Value2.Mutate = Mutate;
  })(Value || (exports.Value = Value = {}));
});

// node_modules/@sinclair/typebox/value/index.js
var require_value2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Value = exports.ValuePointer = exports.Delete = exports.Update = exports.Insert = exports.Edit = exports.ValueErrorIterator = exports.ValueErrorType = undefined;
  var index_1 = require_errors2();
  Object.defineProperty(exports, "ValueErrorType", { enumerable: true, get: function() {
    return index_1.ValueErrorType;
  } });
  Object.defineProperty(exports, "ValueErrorIterator", { enumerable: true, get: function() {
    return index_1.ValueErrorIterator;
  } });
  var delta_1 = require_delta();
  Object.defineProperty(exports, "Edit", { enumerable: true, get: function() {
    return delta_1.Edit;
  } });
  Object.defineProperty(exports, "Insert", { enumerable: true, get: function() {
    return delta_1.Insert;
  } });
  Object.defineProperty(exports, "Update", { enumerable: true, get: function() {
    return delta_1.Update;
  } });
  Object.defineProperty(exports, "Delete", { enumerable: true, get: function() {
    return delta_1.Delete;
  } });
  var pointer_1 = require_pointer();
  Object.defineProperty(exports, "ValuePointer", { enumerable: true, get: function() {
    return pointer_1.ValuePointer;
  } });
  var value_1 = require_value();
  Object.defineProperty(exports, "Value", { enumerable: true, get: function() {
    return value_1.Value;
  } });
});

// node_modules/@sinclair/typebox/compiler/compiler.js
var require_compiler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TypeCompiler = exports.TypeCompilerTypeGuardError = exports.TypeCompilerDereferenceError = exports.TypeCompilerUnknownTypeError = exports.TypeCheck = undefined;
  var index_1 = require_system2();
  var Types = require_typebox();
  var ValueErrors = require_errors2();
  var ValueHash = require_hash();
  var ValueGuard = require_guard();

  class TypeCheck {
    constructor(schema, references, checkFunc, code) {
      this.schema = schema;
      this.references = references;
      this.checkFunc = checkFunc;
      this.code = code;
    }
    Code() {
      return this.code;
    }
    Errors(value) {
      return ValueErrors.Errors(this.schema, this.references, value);
    }
    Check(value) {
      return this.checkFunc(value);
    }
  }
  exports.TypeCheck = TypeCheck;
  var Character;
  (function(Character2) {
    function DollarSign(code) {
      return code === 36;
    }
    Character2.DollarSign = DollarSign;
    function IsUnderscore(code) {
      return code === 95;
    }
    Character2.IsUnderscore = IsUnderscore;
    function IsAlpha(code) {
      return code >= 65 && code <= 90 || code >= 97 && code <= 122;
    }
    Character2.IsAlpha = IsAlpha;
    function IsNumeric(code) {
      return code >= 48 && code <= 57;
    }
    Character2.IsNumeric = IsNumeric;
  })(Character || (Character = {}));
  var MemberExpression;
  (function(MemberExpression2) {
    function IsFirstCharacterNumeric(value) {
      if (value.length === 0)
        return false;
      return Character.IsNumeric(value.charCodeAt(0));
    }
    function IsAccessor(value) {
      if (IsFirstCharacterNumeric(value))
        return false;
      for (let i = 0;i < value.length; i++) {
        const code = value.charCodeAt(i);
        const check = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
        if (!check)
          return false;
      }
      return true;
    }
    function EscapeHyphen(key) {
      return key.replace(/'/g, "\\'");
    }
    function Encode(object, key) {
      return IsAccessor(key) ? `${object}.${key}` : `${object}['${EscapeHyphen(key)}']`;
    }
    MemberExpression2.Encode = Encode;
  })(MemberExpression || (MemberExpression = {}));
  var Identifier;
  (function(Identifier2) {
    function Encode($id) {
      const buffer = [];
      for (let i = 0;i < $id.length; i++) {
        const code = $id.charCodeAt(i);
        if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
          buffer.push($id.charAt(i));
        } else {
          buffer.push(`_${code}_`);
        }
      }
      return buffer.join("").replace(/__/g, "_");
    }
    Identifier2.Encode = Encode;
  })(Identifier || (Identifier = {}));

  class TypeCompilerUnknownTypeError extends Error {
    constructor(schema) {
      super("TypeCompiler: Unknown type");
      this.schema = schema;
    }
  }
  exports.TypeCompilerUnknownTypeError = TypeCompilerUnknownTypeError;

  class TypeCompilerDereferenceError extends Error {
    constructor(schema) {
      super(`TypeCompiler: Unable to dereference type with \$id '${schema.$ref}'`);
      this.schema = schema;
    }
  }
  exports.TypeCompilerDereferenceError = TypeCompilerDereferenceError;

  class TypeCompilerTypeGuardError extends Error {
    constructor(schema) {
      super("TypeCompiler: Preflight validation check failed to guard for the given schema");
      this.schema = schema;
    }
  }
  exports.TypeCompilerTypeGuardError = TypeCompilerTypeGuardError;
  var TypeCompiler;
  (function(TypeCompiler2) {
    function IsAnyOrUnknown(schema) {
      return schema[Types.Kind] === "Any" || schema[Types.Kind] === "Unknown";
    }
    function IsExactOptionalProperty(value, key, expression) {
      return index_1.TypeSystem.ExactOptionalPropertyTypes ? `('${key}' in ${value} ? ${expression} : true)` : `(${MemberExpression.Encode(value, key)} !== undefined ? ${expression} : true)`;
    }
    function IsObjectCheck(value) {
      return !index_1.TypeSystem.AllowArrayObjects ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}))` : `(typeof ${value} === 'object' && ${value} !== null)`;
    }
    function IsRecordCheck(value) {
      return !index_1.TypeSystem.AllowArrayObjects ? `(typeof ${value} === 'object' && ${value} !== null && !Array.isArray(${value}) && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))` : `(typeof ${value} === 'object' && ${value} !== null && !(${value} instanceof Date) && !(${value} instanceof Uint8Array))`;
    }
    function IsNumberCheck(value) {
      return !index_1.TypeSystem.AllowNaN ? `(typeof ${value} === 'number' && Number.isFinite(${value}))` : `typeof ${value} === 'number'`;
    }
    function IsVoidCheck(value) {
      return index_1.TypeSystem.AllowVoidNull ? `(${value} === undefined || ${value} === null)` : `${value} === undefined`;
    }
    function* TAny(schema, references, value) {
      yield "true";
    }
    function* TArray(schema, references, value) {
      yield `Array.isArray(${value})`;
      const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
      if (ValueGuard.IsNumber(schema.minItems))
        yield `${value}.length >= ${schema.minItems}`;
      if (ValueGuard.IsNumber(schema.maxItems))
        yield `${value}.length <= ${schema.maxItems}`;
      const elementExpression = CreateExpression(schema.items, references, "value");
      yield `${value}.every((${parameter}) => ${elementExpression})`;
      if (Types.TypeGuard.TSchema(schema.contains) || ValueGuard.IsNumber(schema.minContains) || ValueGuard.IsNumber(schema.maxContains)) {
        const containsSchema = Types.TypeGuard.TSchema(schema.contains) ? schema.contains : Types.Type.Never();
        const checkExpression = CreateExpression(containsSchema, references, "value");
        const checkMinContains = ValueGuard.IsNumber(schema.minContains) ? [`(count >= ${schema.minContains})`] : [];
        const checkMaxContains = ValueGuard.IsNumber(schema.maxContains) ? [`(count <= ${schema.maxContains})`] : [];
        const checkCount = `const count = ${value}.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
        const check = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
        yield `((${parameter}) => { ${checkCount}; return ${check}})(${value})`;
      }
      if (schema.uniqueItems === true) {
        const check = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
        const block = `const set = new Set(); for(const element of value) { ${check} }`;
        yield `((${parameter}) => { ${block} )(${value})`;
      }
    }
    function* TAsyncIterator(schema, references, value) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${value})`;
    }
    function* TBigInt(schema, references, value) {
      yield `(typeof ${value} === 'bigint')`;
      if (ValueGuard.IsBigInt(schema.multipleOf))
        yield `(${value} % BigInt(${schema.multipleOf})) === 0`;
      if (ValueGuard.IsBigInt(schema.exclusiveMinimum))
        yield `${value} > BigInt(${schema.exclusiveMinimum})`;
      if (ValueGuard.IsBigInt(schema.exclusiveMaximum))
        yield `${value} < BigInt(${schema.exclusiveMaximum})`;
      if (ValueGuard.IsBigInt(schema.minimum))
        yield `${value} >= BigInt(${schema.minimum})`;
      if (ValueGuard.IsBigInt(schema.maximum))
        yield `${value} <= BigInt(${schema.maximum})`;
    }
    function* TBoolean(schema, references, value) {
      yield `(typeof ${value} === 'boolean')`;
    }
    function* TConstructor(schema, references, value) {
      yield* Visit(schema.returns, references, `${value}.prototype`);
    }
    function* TDate(schema, references, value) {
      yield `(${value} instanceof Date) && Number.isFinite(${value}.getTime())`;
      if (ValueGuard.IsNumber(schema.exclusiveMinimumTimestamp))
        yield `${value}.getTime() > ${schema.exclusiveMinimumTimestamp}`;
      if (ValueGuard.IsNumber(schema.exclusiveMaximumTimestamp))
        yield `${value}.getTime() < ${schema.exclusiveMaximumTimestamp}`;
      if (ValueGuard.IsNumber(schema.minimumTimestamp))
        yield `${value}.getTime() >= ${schema.minimumTimestamp}`;
      if (ValueGuard.IsNumber(schema.maximumTimestamp))
        yield `${value}.getTime() <= ${schema.maximumTimestamp}`;
    }
    function* TFunction(schema, references, value) {
      yield `(typeof ${value} === 'function')`;
    }
    function* TInteger(schema, references, value) {
      yield `(typeof ${value} === 'number' && Number.isInteger(${value}))`;
      if (ValueGuard.IsNumber(schema.multipleOf))
        yield `(${value} % ${schema.multipleOf}) === 0`;
      if (ValueGuard.IsNumber(schema.exclusiveMinimum))
        yield `${value} > ${schema.exclusiveMinimum}`;
      if (ValueGuard.IsNumber(schema.exclusiveMaximum))
        yield `${value} < ${schema.exclusiveMaximum}`;
      if (ValueGuard.IsNumber(schema.minimum))
        yield `${value} >= ${schema.minimum}`;
      if (ValueGuard.IsNumber(schema.maximum))
        yield `${value} <= ${schema.maximum}`;
    }
    function* TIntersect(schema, references, value) {
      const check1 = schema.allOf.map((schema2) => CreateExpression(schema2, references, value)).join(" && ");
      if (schema.unevaluatedProperties === false) {
        const keyCheck = CreateVariable(`${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`);
        const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key))`;
        yield `(${check1} && ${check2})`;
      } else if (Types.TypeGuard.TSchema(schema.unevaluatedProperties)) {
        const keyCheck = CreateVariable(`${new RegExp(Types.KeyResolver.ResolvePattern(schema))};`);
        const check2 = `Object.getOwnPropertyNames(${value}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema.unevaluatedProperties, references, `${value}[key]`)})`;
        yield `(${check1} && ${check2})`;
      } else {
        yield `(${check1})`;
      }
    }
    function* TIterator(schema, references, value) {
      yield `(typeof value === 'object' && Symbol.iterator in ${value})`;
    }
    function* TLiteral(schema, references, value) {
      if (typeof schema.const === "number" || typeof schema.const === "boolean") {
        yield `(${value} === ${schema.const})`;
      } else {
        yield `(${value} === '${schema.const}')`;
      }
    }
    function* TNever(schema, references, value) {
      yield `false`;
    }
    function* TNot(schema, references, value) {
      const expression = CreateExpression(schema.not, references, value);
      yield `(!${expression})`;
    }
    function* TNull(schema, references, value) {
      yield `(${value} === null)`;
    }
    function* TNumber(schema, references, value) {
      yield IsNumberCheck(value);
      if (ValueGuard.IsNumber(schema.multipleOf))
        yield `(${value} % ${schema.multipleOf}) === 0`;
      if (ValueGuard.IsNumber(schema.exclusiveMinimum))
        yield `${value} > ${schema.exclusiveMinimum}`;
      if (ValueGuard.IsNumber(schema.exclusiveMaximum))
        yield `${value} < ${schema.exclusiveMaximum}`;
      if (ValueGuard.IsNumber(schema.minimum))
        yield `${value} >= ${schema.minimum}`;
      if (ValueGuard.IsNumber(schema.maximum))
        yield `${value} <= ${schema.maximum}`;
    }
    function* TObject(schema, references, value) {
      yield IsObjectCheck(value);
      if (ValueGuard.IsNumber(schema.minProperties))
        yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
      if (ValueGuard.IsNumber(schema.maxProperties))
        yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
      const knownKeys = Object.getOwnPropertyNames(schema.properties);
      for (const knownKey of knownKeys) {
        const memberExpression = MemberExpression.Encode(value, knownKey);
        const property = schema.properties[knownKey];
        if (schema.required && schema.required.includes(knownKey)) {
          yield* Visit(property, references, memberExpression);
          if (Types.ExtendsUndefined.Check(property) || IsAnyOrUnknown(property))
            yield `('${knownKey}' in ${value})`;
        } else {
          const expression = CreateExpression(property, references, memberExpression);
          yield IsExactOptionalProperty(value, knownKey, expression);
        }
      }
      if (schema.additionalProperties === false) {
        if (schema.required && schema.required.length === knownKeys.length) {
          yield `Object.getOwnPropertyNames(${value}).length === ${knownKeys.length}`;
        } else {
          const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key))`;
        }
      }
      if (typeof schema.additionalProperties === "object") {
        const expression = CreateExpression(schema.additionalProperties, references, `${value}[key]`);
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${value}).every(key => ${keys}.includes(key) || ${expression}))`;
      }
    }
    function* TPromise(schema, references, value) {
      yield `(typeof value === 'object' && typeof ${value}.then === 'function')`;
    }
    function* TRecord(schema, references, value) {
      yield IsRecordCheck(value);
      if (ValueGuard.IsNumber(schema.minProperties))
        yield `Object.getOwnPropertyNames(${value}).length >= ${schema.minProperties}`;
      if (ValueGuard.IsNumber(schema.maxProperties))
        yield `Object.getOwnPropertyNames(${value}).length <= ${schema.maxProperties}`;
      const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
      const variable = CreateVariable(`new RegExp(/${patternKey}/)`);
      const check1 = CreateExpression(patternSchema, references, "value");
      const check2 = Types.TypeGuard.TSchema(schema.additionalProperties) ? CreateExpression(schema.additionalProperties, references, value) : schema.additionalProperties === false ? "false" : "true";
      const expression = `(${variable}.test(key) ? ${check1} : ${check2})`;
      yield `(Object.entries(${value}).every(([key, value]) => ${expression}))`;
    }
    function* TRef(schema, references, value) {
      const index = references.findIndex((foreign) => foreign.$id === schema.$ref);
      if (index === -1)
        throw new TypeCompilerDereferenceError(schema);
      const target = references[index];
      if (state.functions.has(schema.$ref))
        return yield `${CreateFunctionName(schema.$ref)}(${value})`;
      yield* Visit(target, references, value);
    }
    function* TString(schema, references, value) {
      yield `(typeof ${value} === 'string')`;
      if (ValueGuard.IsNumber(schema.minLength))
        yield `${value}.length >= ${schema.minLength}`;
      if (ValueGuard.IsNumber(schema.maxLength))
        yield `${value}.length <= ${schema.maxLength}`;
      if (schema.pattern !== undefined) {
        const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
        yield `${variable}.test(${value})`;
      }
      if (schema.format !== undefined) {
        yield `format('${schema.format}', ${value})`;
      }
    }
    function* TSymbol(schema, references, value) {
      yield `(typeof ${value} === 'symbol')`;
    }
    function* TTemplateLiteral(schema, references, value) {
      yield `(typeof ${value} === 'string')`;
      const variable = CreateVariable(`${new RegExp(schema.pattern)};`);
      yield `${variable}.test(${value})`;
    }
    function* TThis(schema, references, value) {
      const func = CreateFunctionName(schema.$ref);
      yield `${func}(${value})`;
    }
    function* TTuple(schema, references, value) {
      yield `Array.isArray(${value})`;
      if (schema.items === undefined)
        return yield `${value}.length === 0`;
      yield `(${value}.length === ${schema.maxItems})`;
      for (let i = 0;i < schema.items.length; i++) {
        const expression = CreateExpression(schema.items[i], references, `${value}[${i}]`);
        yield `${expression}`;
      }
    }
    function* TUndefined(schema, references, value) {
      yield `${value} === undefined`;
    }
    function* TUnion(schema, references, value) {
      const expressions = schema.anyOf.map((schema2) => CreateExpression(schema2, references, value));
      yield `(${expressions.join(" || ")})`;
    }
    function* TUint8Array(schema, references, value) {
      yield `${value} instanceof Uint8Array`;
      if (ValueGuard.IsNumber(schema.maxByteLength))
        yield `(${value}.length <= ${schema.maxByteLength})`;
      if (ValueGuard.IsNumber(schema.minByteLength))
        yield `(${value}.length >= ${schema.minByteLength})`;
    }
    function* TUnknown(schema, references, value) {
      yield "true";
    }
    function* TVoid(schema, references, value) {
      yield IsVoidCheck(value);
    }
    function* TKind(schema, references, value) {
      const instance = state.instances.size;
      state.instances.set(instance, schema);
      yield `kind('${schema[Types.Kind]}', ${instance}, ${value})`;
    }
    function* Visit(schema, references, value, useHoisting = true) {
      const references_ = ValueGuard.IsString(schema.$id) ? [...references, schema] : references;
      const schema_ = schema;
      if (useHoisting && ValueGuard.IsString(schema.$id)) {
        const functionName = CreateFunctionName(schema.$id);
        if (state.functions.has(functionName)) {
          return yield `${functionName}(${value})`;
        } else {
          const functionCode = CreateFunction(functionName, schema, references, "value", false);
          state.functions.set(functionName, functionCode);
          return yield `${functionName}(${value})`;
        }
      }
      switch (schema_[Types.Kind]) {
        case "Any":
          return yield* TAny(schema_, references_, value);
        case "Array":
          return yield* TArray(schema_, references_, value);
        case "AsyncIterator":
          return yield* TAsyncIterator(schema_, references_, value);
        case "BigInt":
          return yield* TBigInt(schema_, references_, value);
        case "Boolean":
          return yield* TBoolean(schema_, references_, value);
        case "Constructor":
          return yield* TConstructor(schema_, references_, value);
        case "Date":
          return yield* TDate(schema_, references_, value);
        case "Function":
          return yield* TFunction(schema_, references_, value);
        case "Integer":
          return yield* TInteger(schema_, references_, value);
        case "Intersect":
          return yield* TIntersect(schema_, references_, value);
        case "Iterator":
          return yield* TIterator(schema_, references_, value);
        case "Literal":
          return yield* TLiteral(schema_, references_, value);
        case "Never":
          return yield* TNever(schema_, references_, value);
        case "Not":
          return yield* TNot(schema_, references_, value);
        case "Null":
          return yield* TNull(schema_, references_, value);
        case "Number":
          return yield* TNumber(schema_, references_, value);
        case "Object":
          return yield* TObject(schema_, references_, value);
        case "Promise":
          return yield* TPromise(schema_, references_, value);
        case "Record":
          return yield* TRecord(schema_, references_, value);
        case "Ref":
          return yield* TRef(schema_, references_, value);
        case "String":
          return yield* TString(schema_, references_, value);
        case "Symbol":
          return yield* TSymbol(schema_, references_, value);
        case "TemplateLiteral":
          return yield* TTemplateLiteral(schema_, references_, value);
        case "This":
          return yield* TThis(schema_, references_, value);
        case "Tuple":
          return yield* TTuple(schema_, references_, value);
        case "Undefined":
          return yield* TUndefined(schema_, references_, value);
        case "Union":
          return yield* TUnion(schema_, references_, value);
        case "Uint8Array":
          return yield* TUint8Array(schema_, references_, value);
        case "Unknown":
          return yield* TUnknown(schema_, references_, value);
        case "Void":
          return yield* TVoid(schema_, references_, value);
        default:
          if (!Types.TypeRegistry.Has(schema_[Types.Kind]))
            throw new TypeCompilerUnknownTypeError(schema);
          return yield* TKind(schema_, references_, value);
      }
    }
    const state = {
      language: "javascript",
      functions: new Map,
      variables: new Map,
      instances: new Map
    };
    function CreateExpression(schema, references, value, useHoisting = true) {
      return `(${[...Visit(schema, references, value, useHoisting)].join(" && ")})`;
    }
    function CreateFunctionName($id) {
      return `check_${Identifier.Encode($id)}`;
    }
    function CreateVariable(expression) {
      const variableName = `local_${state.variables.size}`;
      state.variables.set(variableName, `const ${variableName} = ${expression}`);
      return variableName;
    }
    function CreateFunction(name, schema, references, value, useHoisting = true) {
      const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
      const parameter = CreateParameter("value", "any");
      const returns = CreateReturns("boolean");
      const expression = [...Visit(schema, references, value, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
      return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
    }
    function CreateParameter(name, type) {
      const annotation = state.language === "typescript" ? `: ${type}` : "";
      return `${name}${annotation}`;
    }
    function CreateReturns(type) {
      return state.language === "typescript" ? `: ${type}` : "";
    }
    function Build(schema, references, options) {
      const functionCode = CreateFunction("check", schema, references, "value");
      const parameter = CreateParameter("value", "any");
      const returns = CreateReturns("boolean");
      const functions = [...state.functions.values()];
      const variables = [...state.variables.values()];
      const checkFunction = ValueGuard.IsString(schema.$id) ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema.$id)}(value)\n}` : `return ${functionCode}`;
      return [...variables, ...functions, checkFunction].join("\n");
    }
    function Code(...args) {
      const defaults = { language: "javascript" };
      const [schema, references, options] = args.length === 2 && ValueGuard.IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !ValueGuard.IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
      state.language = options.language;
      state.variables.clear();
      state.functions.clear();
      state.instances.clear();
      if (!Types.TypeGuard.TSchema(schema))
        throw new TypeCompilerTypeGuardError(schema);
      for (const schema2 of references)
        if (!Types.TypeGuard.TSchema(schema2))
          throw new TypeCompilerTypeGuardError(schema2);
      return Build(schema, references, options);
    }
    TypeCompiler2.Code = Code;
    function Compile(schema, references = []) {
      const generatedCode = Code(schema, references, { language: "javascript" });
      const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
      const instances = new Map(state.instances);
      function typeRegistryFunction(kind, instance, value) {
        if (!Types.TypeRegistry.Has(kind) || !instances.has(instance))
          return false;
        const schema2 = instances.get(instance);
        const checkFunc = Types.TypeRegistry.Get(kind);
        return checkFunc(schema2, value);
      }
      function formatRegistryFunction(format, value) {
        if (!Types.FormatRegistry.Has(format))
          return false;
        const checkFunc = Types.FormatRegistry.Get(format);
        return checkFunc(value);
      }
      function valueHashFunction(value) {
        return ValueHash.Hash(value);
      }
      const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, valueHashFunction);
      return new TypeCheck(schema, references, checkFunction, generatedCode);
    }
    TypeCompiler2.Compile = Compile;
  })(TypeCompiler || (exports.TypeCompiler = TypeCompiler = {}));
});

// node_modules/@sinclair/typebox/compiler/index.js
var require_compiler2 = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValueErrorType = undefined;
  var index_1 = require_errors2();
  Object.defineProperty(exports, "ValueErrorType", { enumerable: true, get: function() {
    return index_1.ValueErrorType;
  } });
  __exportStar(require_compiler(), exports);
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var decodeURIComponent = function(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  };
  var hexCodeToInt = function(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  };
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  module.exports = decodeURIComponent;
});

// node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var parse = function(input) {
    const result = new Empty;
    if (typeof input !== "string") {
      return result;
    }
    let inputLength = input.length;
    let key = "";
    let value2 = "";
    let startingIndex = -1;
    let equalityIndex = -1;
    let shouldDecodeKey = false;
    let shouldDecodeValue = false;
    let keyHasPlus = false;
    let valueHasPlus = false;
    let hasBothKeyValuePair = false;
    let c = 0;
    for (let i = 0;i < inputLength + 1; i++) {
      c = i !== inputLength ? input.charCodeAt(i) : 38;
      if (c === 38) {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair) {
          equalityIndex = i;
        }
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus) {
            key = key.replace(plusRegex, " ");
          }
          if (shouldDecodeKey) {
            key = fastDecode(key) || key;
          }
          if (hasBothKeyValuePair) {
            value2 = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) {
              value2 = value2.replace(plusRegex, " ");
            }
            if (shouldDecodeValue) {
              value2 = fastDecode(value2) || value2;
            }
          }
          const currentValue = result[key];
          if (currentValue === undefined) {
            result[key] = value2;
          } else {
            if (currentValue.pop) {
              currentValue.push(value2);
            } else {
              result[key] = [currentValue, value2];
            }
          }
        }
        value2 = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
      } else if (c === 61) {
        if (equalityIndex <= startingIndex) {
          equalityIndex = i;
        } else {
          shouldDecodeValue = true;
        }
      } else if (c === 43) {
        if (equalityIndex > startingIndex) {
          valueHasPlus = true;
        } else {
          keyHasPlus = true;
        }
      } else if (c === 37) {
        if (equalityIndex > startingIndex) {
          shouldDecodeValue = true;
        } else {
          shouldDecodeKey = true;
        }
      }
    }
    return result;
  };
  var fastDecode = require_fast_decode_uri_component();
  var plusRegex = /\+/g;
  var Empty = function() {
  };
  Empty.prototype = Object.create(null);
  module.exports = parse;
});

// node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS((exports, module) => {
  var encodeString = function(str) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = str.charCodeAt(i);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i)
              out += str.slice(lastPos, i);
            lastPos = i + 1;
            out += hexTable[c];
          }
          if (++i === len)
            break outer;
          c = str.charCodeAt(i);
        }
        if (lastPos < i)
          out += str.slice(lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len) {
          throw new Error("URI malformed");
        }
        const c2 = str.charCodeAt(i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + str.slice(lastPos);
    return out;
  };
  var hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  var noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  module.exports = { encodeString };
});

// node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var getAsPrimitive = function(value2) {
    const type = typeof value2;
    if (type === "string") {
      return encodeString(value2);
    } else if (type === "bigint") {
      return value2.toString();
    } else if (type === "boolean") {
      return value2 ? "true" : "false";
    } else if (type === "number" && Number.isFinite(value2)) {
      return value2 < 1000000000000000000000 ? "" + value2 : encodeString("" + value2);
    }
    return "";
  };
  var stringify = function(input) {
    let result = "";
    if (input === null || typeof input !== "object") {
      return result;
    }
    const separator = "&";
    const keys = Object.keys(input);
    const keyLength = keys.length;
    let valueLength = 0;
    for (let i = 0;i < keyLength; i++) {
      const key = keys[i];
      const value2 = input[key];
      const encodedKey = encodeString(key) + "=";
      if (i) {
        result += separator;
      }
      if (Array.isArray(value2)) {
        valueLength = value2.length;
        for (let j = 0;j < valueLength; j++) {
          if (j) {
            result += separator;
          }
          result += encodedKey;
          result += getAsPrimitive(value2[j]);
        }
      } else {
        result += encodedKey;
        result += getAsPrimitive(value2);
      }
    }
    return result;
  };
  var { encodeString } = require_querystring();
  module.exports = stringify;
});

// node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var parse = require_parse();
  var stringify = require_stringify();
  var fastQuerystring = {
    parse,
    stringify
  };
  module.exports = fastQuerystring;
  module.exports.default = fastQuerystring;
  module.exports.parse = parse;
  module.exports.stringify = stringify;
});

// node_modules/memoirist/dist/index.js
var e = (e2, t) => ({ part: e2, store: null, inert: t !== undefined ? new Map(t.map((e3) => [e3.part.charCodeAt(0), e3])) : null, params: null, wildcardStore: null });
var t = (e2, t2) => ({ ...e2, part: t2 });
var r = (e2) => ({ paramName: e2, store: null, inert: null });

class Memoirist {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add(a, l, i) {
    let s;
    if (typeof l != "string")
      throw TypeError("Route path must be a string");
    l === "" ? l = "/" : l[0] !== "/" && (l = `/${l}`), this.history.push([a, l, i]);
    let n = l[l.length - 1] === "*";
    n && (l = l.slice(0, -1));
    let o = l.split(Memoirist.regex.static), u = l.match(Memoirist.regex.params) || [];
    o[o.length - 1] === "" && o.pop(), s = this.root[a] ? this.root[a] : this.root[a] = e("/");
    let p = 0;
    for (let a2 = 0;a2 < o.length; ++a2) {
      let i2 = o[a2];
      if (a2 > 0) {
        let t2 = u[p++].slice(1);
        if (s.params === null)
          s.params = r(t2);
        else if (s.params.paramName !== t2)
          throw Error(`Cannot create route "${l}" with parameter "${t2}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
        let a3 = s.params;
        if (a3.inert === null) {
          s = a3.inert = e(i2);
          continue;
        }
        s = a3.inert;
      }
      for (let r2 = 0;; ) {
        if (r2 === i2.length) {
          if (r2 < s.part.length) {
            let a3 = t(s, s.part.slice(r2));
            Object.assign(s, e(i2, [a3]));
          }
          break;
        }
        if (r2 === s.part.length) {
          if (s.inert === null)
            s.inert = new Map;
          else if (s.inert.has(i2.charCodeAt(r2))) {
            s = s.inert.get(i2.charCodeAt(r2)), i2 = i2.slice(r2), r2 = 0;
            continue;
          }
          let t2 = e(i2.slice(r2));
          s.inert.set(i2.charCodeAt(r2), t2), s = t2;
          break;
        }
        if (i2[r2] !== s.part[r2]) {
          let a3 = t(s, s.part.slice(r2)), l2 = e(i2.slice(r2));
          Object.assign(s, e(s.part.slice(0, r2), [a3, l2])), s = l2;
          break;
        }
        ++r2;
      }
    }
    if (p < u.length) {
      let e2 = u[p], t2 = e2.slice(1);
      if (s.params === null)
        s.params = r(t2);
      else if (s.params.paramName !== t2)
        throw Error(`Cannot create route "${l}" with parameter "${t2}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
      return s.params.store === null && (s.params.store = i), s.params.store;
    }
    return n ? (s.wildcardStore === null && (s.wildcardStore = i), s.wildcardStore) : (s.store === null && (s.store = i), s.store);
  }
  find(e2, t2) {
    let r2 = this.root[e2];
    return r2 ? a(t2, t2.length, r2, 0) : null;
  }
}
var a = (e2, t2, r2, l) => {
  let i = r2?.part, s = l + i.length;
  if (i.length > 1) {
    if (s > t2)
      return null;
    if (i.length < 15) {
      for (let t3 = 1, r3 = l + 1;t3 < i.length; ++t3, ++r3)
        if (i.charCodeAt(t3) !== e2.charCodeAt(r3))
          return null;
    } else if (e2.substring(l, s) !== i)
      return null;
  }
  if (s === t2)
    return r2.store !== null ? { store: r2.store, params: {} } : r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": "" } } : null;
  if (r2.inert !== null) {
    let l2 = r2.inert.get(e2.charCodeAt(s));
    if (l2 !== undefined) {
      let r3 = a(e2, t2, l2, s);
      if (r3 !== null)
        return r3;
    }
  }
  if (r2.params !== null) {
    let l2 = r2.params, i2 = e2.indexOf("/", s);
    if (i2 !== s) {
      if (i2 === -1 || i2 >= t2) {
        if (l2.store !== null) {
          let r3 = {};
          return r3[l2.paramName] = e2.substring(s, t2), { store: l2.store, params: r3 };
        }
      } else if (l2.inert !== null) {
        let r3 = a(e2, t2, l2.inert, i2);
        if (r3 !== null)
          return r3.params[l2.paramName] = e2.substring(s, i2), r3;
      }
    }
  }
  return r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": e2.substring(s, t2) } } : null;
};

// node_modules/elysia/dist/utils.js
var typebox = __toESM(require_typebox(), 1);
var value = __toESM(require_value2(), 1);
var compiler = __toESM(require_compiler2(), 1);
var mergeObjectArray = (e3, r3) => {
  let o2 = [...Array.isArray(e3) ? e3 : [e3]], t2 = [];
  for (let e4 of o2)
    e4.$elysiaChecksum && t2.push(e4.$elysiaChecksum);
  for (let e4 of Array.isArray(r3) ? r3 : [r3])
    t2.includes(e4?.$elysiaChecksum) || o2.push(e4);
  return o2;
};
var mergeHook = (e3, r3) => ({ body: r3?.body ?? e3?.body, headers: r3?.headers ?? e3?.headers, params: r3?.params ?? e3?.params, query: r3?.query ?? e3?.query, response: r3?.response ?? e3?.response, type: e3?.type || r3?.type, detail: mergeDeep(r3?.detail ?? {}, e3?.detail ?? {}), parse: mergeObjectArray(e3.parse ?? [], r3?.parse ?? []), transform: mergeObjectArray(e3.transform ?? [], r3?.transform ?? []), beforeHandle: mergeObjectArray(e3.beforeHandle ?? [], r3?.beforeHandle ?? []), afterHandle: mergeObjectArray(e3.afterHandle ?? [], r3?.afterHandle ?? []), onResponse: mergeObjectArray(e3.onResponse ?? [], r3?.onResponse ?? []), error: mergeObjectArray(e3.error ?? [], r3?.error ?? []) });
var t2 = (e3) => e3 && typeof e3 == "object" && !Array.isArray(e3);
var mergeDeep = (e3, r3) => {
  let o2 = Object.assign({}, e3);
  return t2(e3) && t2(r3) && Object.keys(r3).forEach((a2) => {
    t2(r3[a2]) && (a2 in e3) ? o2[a2] = mergeDeep(e3[a2], r3[a2]) : Object.assign(o2, { [a2]: r3[a2] });
  }), o2;
};
var getSchemaValidator = (e3, { models: t3 = {}, additionalProperties: a2 = false, dynamic: s = false }) => {
  if (!e3 || typeof e3 == "string" && !(e3 in t3))
    return;
  let n = typeof e3 == "string" ? t3[e3] : e3;
  return (n.type === "object" && ("additionalProperties" in n) == false && (n.additionalProperties = a2), s) ? { schema: n, references: "", checkFunc: () => {
  }, code: "", Check: (e4) => value.Value.Check(n, e4), Errors: (e4) => value.Value.Errors(n, e4), Code: () => "" } : compiler.TypeCompiler.Compile(n);
};
var getResponseSchemaValidator = (t3, { models: a2 = {}, additionalProperties: s = false, dynamic: n = false }) => {
  if (!t3 || typeof t3 == "string" && !(t3 in a2))
    return;
  let l = typeof t3 == "string" ? a2[t3] : t3, p = (e3) => n ? { schema: e3, references: "", checkFunc: () => {
  }, code: "", Check: (o2) => value.Value.Check(e3, o2), Errors: (o2) => value.Value.Errors(e3, o2), Code: () => "" } : compiler.TypeCompiler.Compile(e3);
  if (typebox.Kind in l)
    return { 200: p(l) };
  let i = {};
  return Object.keys(l).forEach((r3) => {
    let o2 = l[r3];
    if (typeof o2 == "string") {
      if (o2 in a2) {
        let t4 = a2[o2];
        t4.type, i[+r3] = (typebox.Kind in t4) ? p(t4) : t4;
      }
      return;
    }
    o2.type === "object" && ("additionalProperties" in o2) == false && (o2.additionalProperties = s), i[+r3] = (typebox.Kind in o2) ? p(o2) : o2;
  }), i;
};
var checksum = (e3) => {
  let r3 = 9;
  for (let o2 = 0;o2 < e3.length; )
    r3 = Math.imul(r3 ^ e3.charCodeAt(o2++), 387420489);
  return r3 ^ r3 >>> 9;
};
var mergeLifeCycle = (e3, r3, o2) => {
  let t3 = (e4) => (o2 && (e4.$elysiaChecksum = o2), e4);
  return { start: mergeObjectArray(e3.start, ("start" in r3 ? r3.start : []).map(t3)), request: mergeObjectArray(e3.request, ("request" in r3 ? r3.request : []).map(t3)), parse: mergeObjectArray(e3.parse, r3?.parse ?? []).map(t3), transform: mergeObjectArray(e3.transform, (r3?.transform ?? []).map(t3)), beforeHandle: mergeObjectArray(e3.beforeHandle, (r3?.beforeHandle ?? []).map(t3)), afterHandle: mergeObjectArray(e3.afterHandle, (r3?.afterHandle ?? []).map(t3)), onResponse: mergeObjectArray(e3.onResponse, (r3?.onResponse ?? []).map(t3)), error: mergeObjectArray(e3.error, (r3?.error ?? []).map(t3)), stop: mergeObjectArray(e3.stop, ("stop" in r3 ? r3.stop : []).map(t3)) };
};
var asGlobal = (e3, r3 = true) => e3 ? typeof e3 == "function" ? (r3 ? e3.$elysiaHookType = "global" : e3.$elysiaHookType = undefined, e3) : e3.map((e4) => (r3 ? e4.$elysiaHookType = "global" : e4.$elysiaHookType = undefined, e4)) : e3;
var a2 = (e3) => e3 ? typeof e3 == "function" ? e3.$elysiaHookType === "global" ? e3 : undefined : e3.filter((e4) => e4.$elysiaHookType === "global") : e3;
var filterGlobalHook = (e3) => ({ ...e3, type: e3?.type, detail: e3?.detail, parse: a2(e3?.parse), transform: a2(e3?.transform), beforeHandle: a2(e3?.beforeHandle), afterHandle: a2(e3?.afterHandle), onResponse: a2(e3?.onResponse), error: a2(e3?.error) });

// node_modules/elysia/dist/compose.js
var import_fast_querystring = __toESM(require_lib(), 1);

// node_modules/elysia/dist/handler.js
var e3 = "toJSON" in new Headers;
var isNotEmpty = (e4) => {
  for (let s in e4)
    return true;
  return false;
};
var s = (e4, s2) => {
  e4.delete("Set-Cookie");
  for (let r3 = 0;r3 < s2.length; r3++) {
    let n = s2[r3].indexOf("=");
    e4.append("Set-Cookie", `${s2[r3].slice(0, n)}=${s2[r3].slice(n + 1)}`);
  }
  return e4;
};
var mapEarlyResponse = (r3, n) => {
  if (isNotEmpty(n.headers) || n.status !== 200 || n.redirect)
    switch (n.redirect && (n.headers.Location = n.redirect, n.status = 302), n.headers["Set-Cookie"] && Array.isArray(n.headers["Set-Cookie"]) && (n.headers = s(new Headers(n.headers), n.headers["Set-Cookie"])), r3?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(r3, n);
      case "Object":
      case "Array":
        return Response.json(r3, n);
      case undefined:
        if (!r3)
          return;
        return Response.json(r3, n);
      case "Response":
        let t3 = Object.assign({}, n.headers);
        if (e3)
          n.headers = r3.headers.toJSON();
        else
          for (let [e4, s2] of r3.headers.entries())
            (e4 in n.headers) || (n.headers[e4] = s2);
        for (let e4 in t3)
          r3.headers.append(e4, t3[e4]);
        return r3.status !== n.status && (n.status = r3.status), r3;
      case "Promise":
        return r3.then((e4) => {
          let s2 = mapEarlyResponse(e4, n);
          if (s2 !== undefined)
            return s2;
        });
      case "Error":
        return errorToResponse(r3, n.headers);
      case "Function":
        return r3();
      case "Number":
      case "Boolean":
        return new Response(r3.toString(), n);
      default:
        if (r3 instanceof Response)
          return r3;
        let o2 = JSON.stringify(r3);
        if (o2.charCodeAt(0) === 123)
          return n.headers["Content-Type"] || (n.headers["Content-Type"] = "application/json"), new Response(JSON.stringify(r3), n);
        return new Response(o2, n);
    }
  else
    switch (r3?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(r3);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(r3), { headers: { "content-type": "application/json" } });
      case undefined:
        if (!r3)
          return new Response("");
        return new Response(JSON.stringify(r3), { headers: { "content-type": "application/json" } });
      case "Response":
        return r3;
      case "Promise":
        return r3.then((e4) => {
          let s2 = mapEarlyResponse(e4, n);
          if (s2 !== undefined)
            return s2;
        });
      case "Error":
        return errorToResponse(r3, n.headers);
      case "Function":
        return r3();
      case "Number":
      case "Boolean":
        return new Response(r3.toString());
      default:
        if (r3 instanceof Response)
          return r3;
        let a3 = JSON.stringify(r3);
        if (a3.charCodeAt(0) === 123)
          return new Response(JSON.stringify(r3), { headers: { "Content-Type": "application/json" } });
        return new Response(a3);
    }
};
var mapResponse = (r3, n) => {
  if (isNotEmpty(n.headers) || n.status !== 200 || n.redirect)
    switch (n.redirect && (n.headers.Location = n.redirect, n.status = 302), n.headers["Set-Cookie"] && Array.isArray(n.headers["Set-Cookie"]) && (n.headers = s(new Headers(n.headers), n.headers["Set-Cookie"])), r3?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(r3, { status: n.status, headers: n.headers });
      case "Object":
      case "Array":
        return Response.json(r3, n);
      case undefined:
        if (!r3)
          return new Response("", n);
        return Response.json(r3, n);
      case "Response":
        let t3 = Object.assign({}, n.headers);
        if (e3)
          n.headers = r3.headers.toJSON();
        else
          for (let [e4, s2] of r3.headers.entries())
            (e4 in n.headers) || (n.headers[e4] = s2);
        for (let e4 in t3)
          r3.headers.append(e4, t3[e4]);
        return r3;
      case "Error":
        return errorToResponse(r3, n.headers);
      case "Promise":
        return r3.then((e4) => mapResponse(e4, n));
      case "Function":
        return r3();
      case "Number":
      case "Boolean":
        return new Response(r3.toString(), n);
      default:
        if (r3 instanceof Response)
          return r3;
        let o2 = JSON.stringify(r3);
        if (o2.charCodeAt(0) === 123)
          return n.headers["Content-Type"] || (n.headers["Content-Type"] = "application/json"), new Response(JSON.stringify(r3), n);
        return new Response(o2, n);
    }
  else
    switch (r3?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response(r3);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(r3), { headers: { "content-type": "application/json" } });
      case undefined:
        if (!r3)
          return new Response("");
        return new Response(JSON.stringify(r3), { headers: { "content-type": "application/json" } });
      case "Response":
        return r3;
      case "Error":
        return errorToResponse(r3);
      case "Promise":
        return r3.then((e4) => {
          let s2 = mapResponse(e4, n);
          return s2 !== undefined ? s2 : new Response("");
        });
      case "Function":
        return r3();
      case "Number":
      case "Boolean":
        return new Response(r3.toString());
      default:
        if (r3 instanceof Response)
          return r3;
        let a3 = JSON.stringify(r3);
        if (a3.charCodeAt(0) === 123)
          return new Response(JSON.stringify(r3), { headers: { "Content-Type": "application/json" } });
        return new Response(a3);
    }
};
var mapCompactResponse = (e4) => {
  switch (e4?.constructor?.name) {
    case "String":
    case "Blob":
      return new Response(e4);
    case "Object":
    case "Array":
      return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
    case undefined:
      if (!e4)
        return new Response("");
      return new Response(JSON.stringify(e4), { headers: { "content-type": "application/json" } });
    case "Response":
      return e4;
    case "Error":
      return errorToResponse(e4);
    case "Promise":
      return e4.then((e5) => {
        let s3 = mapCompactResponse(e5);
        return s3 !== undefined ? s3 : new Response("");
      });
    case "Function":
      return e4();
    case "Number":
    case "Boolean":
      return new Response(e4.toString());
    default:
      if (e4 instanceof Response)
        return e4;
      let s2 = JSON.stringify(e4);
      if (s2.charCodeAt(0) === 123)
        return new Response(JSON.stringify(e4), { headers: { "Content-Type": "application/json" } });
      return new Response(s2);
  }
};
var errorToResponse = (e4, s2) => new Response(JSON.stringify({ name: e4?.name, message: e4?.message, cause: e4?.cause }), { status: 500, headers: s2 });

// node_modules/elysia/dist/error.js
var value2 = __toESM(require_value2(), 1);
var e4 = typeof Bun != "undefined" ? Bun.env : typeof process != "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ErrorCode");
var isProduction = (e4?.NODE_ENV ?? e4?.ENV) === "production";

class InternalServerError extends Error {
  code = "NOT_FOUND";
  status = 500;
  constructor() {
    super("INTERNAL_SERVER_ERROR");
  }
}

class NotFoundError extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor() {
    super("NOT_FOUND");
  }
}
class ValidationError extends Error {
  type;
  validator;
  value;
  code;
  status;
  constructor(e5, t3, o2) {
    let s2 = isProduction ? undefined : t3.Errors(o2).First(), a3 = s2?.schema.error ? typeof s2.schema.error == "function" ? s2.schema.error(e5, t3, o2) : s2.schema.error : undefined, n = isProduction ? a3 ?? `Invalid ${e5 ?? s2?.schema.error ?? s2?.message}` : a3 ?? `Invalid ${e5}, '${s2?.path?.slice(1) || "type"}': ${s2?.message}

Expected: ` + JSON.stringify(value2.Value.Create(t3.schema), null, 2) + "\n\nFound: " + JSON.stringify(o2, null, 2);
    super(n), this.type = e5, this.validator = t3, this.value = o2, this.code = "VALIDATION", this.status = 400, Object.setPrototypeOf(this, ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  get model() {
    return value2.Value.Create(this.validator.schema);
  }
  toResponse(r4) {
    return new Response(this.message, { status: 400, headers: r4 });
  }
}

// node_modules/elysia/dist/compose.js
var i = new Headers;
var l = RegExp(" (\\w+) = context", "g");
var hasReturn = (e6) => {
  let r4 = e6.indexOf(")");
  return e6.charCodeAt(r4 + 2) === 61 && e6.charCodeAt(r4 + 5) !== 123 || e6.includes("return");
};
var f = (e6) => ({ composeValidation: (r4, t3 = `c.${r4}`) => e6 ? `c.set.status = 400; throw new ValidationError(
'${r4}',
${r4},
${t3}
)` : `c.set.status = 400; return new ValidationError(
	'${r4}',
	${r4},
	${t3}
).toResponse(c.set.headers)`, composeResponseValidation: (r4 = "r") => e6 ? `throw new ValidationError(
'response',
response[c.set.status],
${r4}
)` : `return new ValidationError(
'response',
response[c.set.status],
${r4}
).toResponse(c.set.headers)` });
var isFnUse = (e6, r4) => {
  r4 = (r4 = r4.trimStart()).replaceAll(/^async /g, "");
  let t3 = r4.charCodeAt(0) === 40 || r4.startsWith("function") ? r4.slice(r4.indexOf("(") + 1, r4.indexOf(")")) : r4.slice(0, r4.indexOf("=") - 1);
  if (t3 === "")
    return false;
  if (t3.charCodeAt(0) === 123)
    return !!t3.includes(e6);
  if (r4.match(RegExp(`${t3}(.${e6}|\\["${e6}"\\])`)))
    return true;
  let s2 = [t3];
  for (let e7 of r4.matchAll(l))
    s2.push(e7[1]);
  let n = RegExp(`{.*?} = (${s2.join("|")})`, "g");
  for (let [t4] of r4.matchAll(n))
    if (t4.includes(`{ ${e6}`) || t4.includes(`, ${e6}`))
      return true;
  return false;
};
var findElysiaMeta = (e6, r4, t3 = [], s2 = "") => {
  if (r4.type === "object") {
    let n = r4.properties;
    for (let r5 in n) {
      let a3 = n[r5], o2 = s2 ? s2 + "." + r5 : r5;
      if (a3.type === "object") {
        findElysiaMeta(e6, a3, t3, o2);
        continue;
      }
      if (a3.anyOf) {
        for (let r6 of a3.anyOf)
          findElysiaMeta(e6, r6, t3, o2);
        continue;
      }
      a3.elysiaMeta === e6 && t3.push(o2);
    }
    return t3.length === 0 ? null : t3;
  }
  return r4?.elysiaMeta === e6 ? (s2 && t3.push(s2), "root") : null;
};
var u = (e6) => {
  if (!e6)
    return;
  let r4 = e6?.schema;
  if (r4 && ("anyOf" in r4)) {
    let e7 = false, t3 = r4.anyOf[0].type;
    for (let s2 of r4.anyOf)
      if (s2.type !== t3) {
        e7 = true;
        break;
      }
    if (!e7)
      return t3;
  }
};
var d = /(?:return|=>) \S*\(/g;
var isAsync = (e6) => {
  if (e6.constructor.name === "AsyncFunction")
    return true;
  let r4 = e6.toString();
  return !!r4.match(d);
};
var composeHandler = ({ method: l2, hooks: d2, validator: p, handler: y, handleError: h, meta: $, onRequest: m, config: b }) => {
  let q = b.forceErrorEncapsulation || d2.error.length > 0 || typeof Bun == "undefined" || d2.onResponse.length > 0, { composeValidation: E, composeResponseValidation: g } = f(q), R = d2.onResponse.length ? `
;(async () => {${d2.onResponse.map((e6, r4) => `await res${r4}(c)`).join(";")}})();
` : "", w = q ? "try {\n" : "", x = p || l2 !== "GET" ? [y, ...d2.transform, ...d2.beforeHandle, ...d2.afterHandle].map((e6) => e6.toString()) : [], k = l2 !== "GET" && d2.type !== "none" && (!!p.body || !!d2.type || x.some((e6) => isFnUse("body", e6))), H = p.headers || x.some((e6) => isFnUse("headers", e6));
  H && (w += i.toJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`);
  let A = p.query || x.some((e6) => isFnUse("query", e6));
  A && (w += `const url = c.request.url

		if(c.qi !== -1) {
			c.query ??= parseQuery(url.substring(c.qi + 1))
		} else {
			c.query ??= {}
		}
		`);
  let O = x.some((e6) => isFnUse("set", e6)) || m.some((e6) => isFnUse("set", e6.toString())), v = k || isAsync(y) || d2.parse.length > 0 || d2.afterHandle.some(isAsync) || d2.beforeHandle.some(isAsync) || d2.transform.some(isAsync);
  if (k) {
    let e6 = u(p?.body);
    if (d2.type || e6) {
      if (d2.type)
        switch (d2.type) {
          case "application/json":
            w += "c.body = await c.request.json();";
            break;
          case "text/plain":
            w += "c.body = await c.request.text();";
            break;
          case "application/x-www-form-urlencoded":
            w += "c.body = parseQuery(await c.request.text());";
            break;
          case "application/octet-stream":
            w += "c.body = await c.request.arrayBuffer();";
            break;
          case "multipart/form-data":
            w += `c.body = {}

					const form = await c.request.formData()
					for (const key of form.keys()) {
						if (c.body[key])
							continue

						const value = form.getAll(key)
						if (value.length === 1)
							c.body[key] = value[0]
						else c.body[key] = value
					}`;
        }
      else if (e6) {
        let r4 = p?.body?.schema;
        e6 === "object" ? r4.elysiaMeta === "URLEncoded" ? w += "c.body = parseQuery(await c.request.text())" : p.body.Code().includes("custom('File") ? w += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue
		
								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}` : w += "c.body = JSON.parse(await c.request.text())" : w += "c.body = await c.request.text()";
      }
      d2.parse.length && (w += "}}");
    } else {
      if (w += "\n" + (H ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')") + `
            if (contentType) {
				const index = contentType.indexOf(';')
				if (index !== -1) contentType = contentType.substring(0, index)
`, d2.parse.length) {
        w += `let used = false
`;
        for (let e7 = 0;e7 < d2.parse.length; e7++) {
          let r4 = `bo${e7}`;
          e7 !== 0 && (w += `if(!used) {
`), w += `let ${r4} = parse[${e7}](c, contentType);if(${r4} instanceof Promise) ${r4} = await ${r4};
						if(${r4} !== undefined) { c.body = ${r4}; used = true }
`, e7 !== 0 && (w += "}");
        }
        w += "if (!used)";
      }
      w += `switch (contentType) {
			case 'application/json':
				c.body = await c.request.json()
				break

			case 'text/plain':
				c.body = await c.request.text()
				break

			case 'application/x-www-form-urlencoded':
				c.body = parseQuery(await c.request.text())
				break

			case 'application/octet-stream':
				c.body = await c.request.arrayBuffer();
				break

			case 'multipart/form-data':
				c.body = {}

				const form = await c.request.formData()
				for (const key of form.keys()) {
					if (c.body[key])
						continue

					const value = form.getAll(key)
					if (value.length === 1)
						c.body[key] = value[0]
					else c.body[key] = value
				}

				break
			}
		}
`;
    }
    w += "\n";
  }
  if (p.params) {
    let e6 = findElysiaMeta("Numeric", p.params.schema);
    if (e6) {
      if (typeof e6 == "object")
        for (let r4 of e6)
          w += `if(c.params.${r4}) c.params.${r4} = +c.params.${r4};`;
      w += "\n";
    }
  }
  if (p.query) {
    let e6 = findElysiaMeta("Numeric", p.query.schema);
    if (e6) {
      if (typeof e6 == "object")
        for (let r4 of e6)
          w += `if(c.query.${r4}) c.query.${r4} = +c.query.${r4};`;
      w += "\n";
    }
  }
  if (p.headers) {
    let e6 = findElysiaMeta("Numeric", p.headers.schema);
    if (e6) {
      if (typeof e6 == "object")
        for (let r4 of e6)
          w += `c.headers.${r4} = +c.headers.${r4};`;
      w += "\n";
    }
  }
  if (p.body) {
    let e6 = findElysiaMeta("Numeric", p.body.schema);
    if (e6) {
      switch (typeof e6) {
        case "string":
          w += "c.body = +c.body;";
          break;
        case "object":
          for (let r5 of e6)
            w += `c.body.${r5} = +c.body.${r5};`;
      }
      w += "\n";
    }
    let r4 = findElysiaMeta("Files", p.body.schema);
    if (r4) {
      if (typeof r4 == "object")
        for (let e7 of r4)
          w += `if(!Array.isArray(c.body.${e7})) c.body.${e7} = [c.body.${e7}];`;
      w += "\n";
    }
  }
  if (d2?.transform)
    for (let e6 = 0;e6 < d2.transform.length; e6++) {
      let r4 = d2.transform[e6];
      r4.$elysia === "derive" ? w += isAsync(d2.transform[e6]) ? `Object.assign(c, await transform[${e6}](c));` : `Object.assign(c, transform[${e6}](c));` : w += isAsync(d2.transform[e6]) ? `await transform[${e6}](c);` : `transform[${e6}](c);`;
    }
  if (p && (p.headers && (w += `
                if (headers.Check(c.headers) === false) {
                    ${E("headers")}
				}
        `), p.params && (w += `if(params.Check(c.params) === false) { ${E("params")} }`), p.query && (w += `if(query.Check(c.query) === false) { ${E("query")} }`), p.body && (w += `if(body.Check(c.body) === false) { ${E("body")} }`)), d2?.beforeHandle)
    for (let e6 = 0;e6 < d2.beforeHandle.length; e6++) {
      let r4 = `be${e6}`, t3 = hasReturn(d2.beforeHandle[e6].toString());
      if (t3) {
        if (w += (isAsync(d2.beforeHandle[e6]) ? `let ${r4} = await beforeHandle[${e6}](c);
` : `let ${r4} = beforeHandle[${e6}](c);
`) + `if(${r4} !== undefined) {
`, d2?.afterHandle)
          for (let e7 = 0;e7 < d2.afterHandle.length; e7++) {
            let t4 = hasReturn(d2.afterHandle[e7].toString());
            if (t4) {
              let t5 = `af${e7}`;
              w += (isAsync(d2.afterHandle[e7]) ? `const ${t5} = await afterHandle[${e7}](c, ${r4});
` : `const ${t5} = afterHandle[${e7}](c, ${r4});
`) + `if(${t5} !== undefined) { ${r4} = ${t5} }
`;
            } else
              w += isAsync(d2.afterHandle[e7]) ? `await afterHandle[${e7}](c, ${r4});
` : `afterHandle[${e7}](c, ${r4});
`;
          }
        p.response && (w += `if(response[c.set.status]?.Check(${r4}) === false) { 
						if(!(response instanceof Error))
							${g(r4)}
					}
`), w += `return mapEarlyResponse(${r4}, c.set)}
`;
      } else
        w += isAsync(d2.beforeHandle[e6]) ? `await beforeHandle[${e6}](c);
` : `beforeHandle[${e6}](c);
`;
    }
  if (d2?.afterHandle.length) {
    w += isAsync(y) ? `let r = await handler(c);
` : `let r = handler(c);
`;
    for (let e6 = 0;e6 < d2.afterHandle.length; e6++) {
      let r4 = `af${e6}`, t3 = hasReturn(d2.afterHandle[e6].toString());
      t3 ? (w += isAsync(d2.afterHandle[e6]) ? `let ${r4} = await afterHandle[${e6}](c, r)
` : `let ${r4} = afterHandle[${e6}](c, r)
`, p.response ? w += `if(${r4} !== undefined) {if(response[c.set.status]?.Check(${r4}) === false) { 
						if(!(response instanceof Error))
						${g(r4)}
					}
${r4} = mapEarlyResponse(${r4}, c.set)
if(${r4}) return ${r4};
}` : w += `if(${r4}) return ${r4};
`) : w += isAsync(d2.afterHandle[e6]) ? `await afterHandle[${e6}](c, r)
` : `afterHandle[${e6}](c, r)
`;
    }
    p.response && (w += `if(response[c.set.status]?.Check(r) === false) { 
				if(!(response instanceof Error))
					${g()}
			}
`), O ? w += `return mapResponse(r, c.set)
` : w += `return mapCompactResponse(r)
`;
  } else if (p.response)
    w += (isAsync(y) ? `const r = await handler(c);
` : `const r = handler(c);
`) + `if(response[c.set.status]?.Check(r) === false) { 
				if(!(response instanceof Error))
					${g()}
			}
`, O ? w += `return mapResponse(r, c.set)
` : w += `return mapCompactResponse(r)
`;
  else {
    let e6 = isAsync(y) ? "await handler(c) " : "handler(c)";
    O ? w += `return mapResponse(${e6}, c.set)
` : w += `return mapCompactResponse(${e6})
`;
  }
  q && (w += `
} catch(error) {
	

	${v ? "" : "return (async () => {"}
		const set = c.set

		if (!set.status || set.status < 300) set.status = 500

		${d2.error.length ? `for (let i = 0; i < handleErrors.length; i++) {
				let handled = handleErrors[i]({
					request: c.request,
					error: error,
					set,
					code: error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
				})
				if (handled instanceof Promise) handled = await handled

				const response = mapEarlyResponse(handled, set)
				if (response) return response
			}` : ""}

		return handleError(c.request, error, set)
	${v ? "" : "})()"}
} finally {
	${R}
}`), w = `const { 
		handler,
		handleError,
		hooks: {
			transform,
			beforeHandle,
			afterHandle,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		meta,
		ERROR_CODE
	} = hooks

	${d2.onResponse.length ? `const ${d2.onResponse.map((e6, r4) => `res${r4} = onResponse[${r4}]`).join(",")}` : ""}

	return ${v ? "async" : ""} function(c) {
		${$ ? 'c["schema"] = meta["schema"]; c["defs"] = meta["defs"];' : ""}
		${w}
	}`;
  let j = Function("hooks", w);
  return j({ handler: y, hooks: d2, validator: p, handleError: h, utils: { mapResponse, mapCompactResponse, mapEarlyResponse, parseQuery: import_fast_querystring.parse }, error: { NotFoundError, ValidationError, InternalServerError }, meta: $, ERROR_CODE });
};
var composeGeneralHandler = (e6) => {
  let t3 = "";
  for (let r4 of Object.keys(e6.decorators))
    t3 += `,${r4}: app.decorators.${r4}`;
  let { router: s2, staticRouter: a3 } = e6, o2 = `
	const route = find(request.method, path) ${s2.root.ALL ? '?? find("ALL", path)' : ""}
	if (route === null)
		return ${e6.event.error.length ? `handleError(
			request,
			notFound,
			ctx.set
		)` : `new Response(error404, {
					status: 404
				})`}

	ctx.params = route.params

	return route.store(ctx)`, c = "";
  for (let [e7, { code: r4, all: t4 }] of Object.entries(a3.map))
    c += `case '${e7}':
switch(request.method) {
${r4}
${t4 ?? `default: ${o2}`}}

`;
  let i2 = `const {
		app,
		app: { store, router, staticRouter },
		mapEarlyResponse,
		NotFoundError
	} = data

	const notFound = new NotFoundError()

	${e6.event.request.length ? "const onRequest = app.event.request" : ""}

	${a3.variables}

	const find = router.find.bind(router)
	const handleError = app.handleError.bind(this)

	${e6.event.error.length ? "" : "const error404 = notFound.message.toString()"}

	return function(request) {
	`;
  if (e6.event.request.length) {
    i2 += `
			const ctx = {
				request,
				store,
				set: {
					headers: {},
					status: 200
				}
				${t3}
			}

			try {
`;
    for (let r4 = 0;r4 < e6.event.request.length; r4++) {
      let t4 = hasReturn(e6.event.request[r4].toString());
      i2 += t4 ? `const response = mapEarlyResponse(
					onRequest[${r4}](ctx),
					ctx.set
				)
				if (response) return response
` : `mapEarlyResponse(onRequest[${r4}](ctx), ctx.set);`;
    }
    i2 += `} catch (error) {
			return handleError(request, error, ctx.set)
		}
		
		const url = request.url,
		s = url.indexOf('/', 11),
		i = ctx.qi = url.indexOf('?', s + 1),
		path = ctx.path = i === -1 ? url.substring(s) : url.substring(s, i);`;
  } else
    i2 += `
		const url = request.url,
			s = url.indexOf('/', 11),
			qi = url.indexOf('?', s + 1),
			path = qi === -1
				? url.substring(s)
				: url.substring(s, qi)

		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: {},
				status: 200
			}
			${t3}
		}`;
  return i2 += `
		switch(path) {
			${c}

			default:
				${o2}
		}
	}`, e6.handleError = composeErrorHandler(e6), Function("data", i2)({ app: e6, mapEarlyResponse, NotFoundError });
};
var composeErrorHandler = (e6) => {
  let r4 = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE
	} = inject

	return ${e6.event.error.find(isAsync) ? "async" : ""} function(request, error, set) {`;
  for (let t3 = 0;t3 < e6.event.error.length; t3++) {
    let s2 = e6.event.error[t3], n = `${isAsync(s2) ? "await " : ""}onError[${t3}]({
			request,
			code: error.code ?? error[ERROR_CODE] ?? 'UNKNOWN',
			error,
			set
		})`;
    hasReturn(s2.toString()) ? r4 += `const r${t3} = ${n}; if(r${t3} !== undefined) return mapResponse(r${t3}, set)
` : r4 += n + "\n";
  }
  return Function("inject", r4 += `if(error.constructor.name === "ValidationError") {
		set.status = error.status ?? 400
		return new Response(
			error.message, 
			{ headers: set.headers, status: set.status }
		)
	} else {
		return new Response(error.message, { headers: set.headers, status: error.status ?? 500 })
	}
}`)({ app: e6, mapResponse, ERROR_CODE });
};

// node_modules/elysia/dist/ws/index.js
var s2 = (e6) => {
  let r4 = e6.indexOf("/", 10), s3 = e6.indexOf("?", r4);
  return s3 === -1 ? e6.slice(r4) : e6.slice(r4, s3);
};

class ElysiaWS {
  raw;
  data;
  isSubscribed;
  constructor(e6) {
    this.raw = e6, this.data = e6.data, this.isSubscribed = e6.isSubscribed;
  }
  publish(e6, r4, s3) {
    return typeof r4 == "object" && (r4 = JSON.stringify(r4)), this.raw.publish(e6, r4, s3), this;
  }
  publishToSelf(e6, r4, s3) {
    return typeof r4 == "object" && (r4 = JSON.stringify(r4)), this.raw.publish(e6, r4, s3), this;
  }
  send(e6) {
    return typeof e6 == "object" && (e6 = JSON.stringify(e6)), this.raw.send(e6), this;
  }
  subscribe(e6) {
    return this.raw.subscribe(e6), this;
  }
  unsubscribe(e6) {
    return this.raw.unsubscribe(e6), this;
  }
  cork(e6) {
    return this.raw.cork(e6), this;
  }
  close() {
    return this.raw.close(), this;
  }
}
var ws = (t3) => (i2) => {
  i2.wsRouter || (i2.wsRouter = new Memoirist);
  let a3 = i2.wsRouter;
  return i2.config.serve || (i2.config.serve = { websocket: { ...t3, open(e6) {
    if (!e6.data)
      return;
    let r4 = s2(e6?.data.request.url);
    if (!r4)
      return;
    let t4 = a3.find("subscribe", r4)?.store;
    t4 && t4.open && t4.open(new ElysiaWS(e6));
  }, message(e6, t4) {
    if (!e6.data)
      return;
    let i3 = s2(e6?.data.request.url);
    if (!i3)
      return;
    let n = a3.find("subscribe", i3)?.store;
    if (!n?.message)
      return;
    t4 = t4.toString();
    let u2 = t4.charCodeAt(0);
    if (u2 === 47 || u2 === 123)
      try {
        t4 = JSON.parse(t4);
      } catch (e7) {
      }
    else
      Number.isNaN(+t4) || (t4 = +t4);
    for (let r4 = 0;r4 < e6.data.transformMessage.length; r4++) {
      let s3 = e6.data.transformMessage[r4](t4);
      s3 !== undefined && (t4 = s3);
    }
    if (e6.data.message?.Check(t4) === false)
      return void e6.send(new ValidationError("message", e6.data.message, t4).cause);
    n.message(new ElysiaWS(e6), t4);
  }, close(e6, r4, t4) {
    if (!e6.data)
      return;
    let i3 = s2(e6?.data.request.url);
    if (!i3)
      return;
    let n = a3.find("subscribe", i3)?.store;
    n && n.close && n.close(new ElysiaWS(e6), r4, t4);
  }, drain(e6) {
    if (!e6.data)
      return;
    let r4 = s2(e6?.data.request.url);
    if (!r4)
      return;
    let t4 = a3.find("subscribe", r4)?.store;
    t4 && t4.drain && t4.drain(new ElysiaWS(e6));
  } } }), i2.decorate("publish", i2.server?.publish).onStart((e6) => {
    e6.decorators.publish = e6.server?.publish;
  });
};

// node_modules/elysia/dist/dynamic-handle.js
var import_fast_querystring2 = __toESM(require_lib(), 1);
var createDynamicHandler = (a3) => async (o2) => {
  let i2;
  let l2 = { status: 200, headers: {} };
  a3.decorators ? ((i2 = a3.decorators).request = o2, i2.set = l2, i2.store = a3.store) : i2 = { set: l2, store: a3.store, request: o2 };
  let f2 = o2.url, c = f2.indexOf("/", 11), d2 = f2.indexOf("?", c + 1), w = d2 === -1 ? f2.substring(c) : f2.substring(c, d2);
  try {
    let c2;
    for (let e6 = 0;e6 < a3.event.request.length; e6++) {
      let t3 = a3.event.request[e6], s3 = t3(i2);
      if (s3 instanceof Promise && (s3 = await s3), s3 = mapEarlyResponse(s3, l2))
        return s3;
    }
    let m = a3.dynamicRouter.find(o2.method, w) ?? a3.dynamicRouter.find("ALL", w);
    if (!m)
      throw new NotFoundError;
    let { handle: u2, hooks: h, validator: p, content: y } = m.store;
    if (o2.method !== "GET") {
      if (y)
        switch (y) {
          case "application/json":
            c2 = await o2.json();
            break;
          case "text/plain":
            c2 = await o2.text();
            break;
          case "application/x-www-form-urlencoded":
            c2 = import_fast_querystring2.parse(await o2.text());
            break;
          case "application/octet-stream":
            c2 = await o2.arrayBuffer();
            break;
          case "multipart/form-data":
            c2 = {};
            let e6 = await o2.formData();
            for (let t3 of e6.keys()) {
              if (c2[t3])
                continue;
              let a4 = e6.getAll(t3);
              a4.length === 1 ? c2[t3] = a4[0] : c2[t3] = a4;
            }
        }
      else {
        let e6 = o2.headers.get("content-type");
        if (e6) {
          let t3 = e6.indexOf(";");
          t3 !== -1 && (e6 = e6.slice(0, t3));
          for (let t4 = 0;t4 < a3.event.parse.length; t4++) {
            let r4 = a3.event.parse[t4](i2, e6);
            if (r4 instanceof Promise && (r4 = await r4), r4) {
              c2 = r4;
              break;
            }
          }
          if (c2 === undefined)
            switch (e6) {
              case "application/json":
                c2 = await o2.json();
                break;
              case "text/plain":
                c2 = await o2.text();
                break;
              case "application/x-www-form-urlencoded":
                c2 = import_fast_querystring2.parse(await o2.text());
                break;
              case "application/octet-stream":
                c2 = await o2.arrayBuffer();
                break;
              case "multipart/form-data":
                c2 = {};
                let r4 = await o2.formData();
                for (let e7 of r4.keys()) {
                  if (c2[e7])
                    continue;
                  let t4 = r4.getAll(e7);
                  t4.length === 1 ? c2[e7] = t4[0] : c2[e7] = t4;
                }
            }
        }
      }
    }
    i2.body = c2, i2.params = m?.params || {}, i2.query = d2 === -1 ? {} : import_fast_querystring2.parse(f2.substring(d2 + 1));
    for (let e6 = 0;e6 < h.transform.length; e6++) {
      let t3 = h.transform[e6](i2);
      h.transform[e6].$elysia === "derive" ? t3 instanceof Promise ? Object.assign(i2, await t3) : Object.assign(i2, t3) : t3 instanceof Promise && await t3;
    }
    if (p) {
      if (p.headers) {
        let e6 = {};
        for (let t3 in o2.headers)
          e6[t3] = o2.headers.get(t3);
        if (p.headers.Check(e6) === false)
          throw new ValidationError("header", p.headers, e6);
      }
      if (p.params?.Check(i2.params) === false)
        throw new ValidationError("params", p.params, i2.params);
      if (p.query?.Check(i2.query) === false)
        throw new ValidationError("query", p.query, i2.query);
      if (p.body?.Check(c2) === false)
        throw new ValidationError("body", p.body, c2);
    }
    for (let e6 = 0;e6 < h.beforeHandle.length; e6++) {
      let t3 = h.beforeHandle[e6](i2);
      if (t3 instanceof Promise && (t3 = await t3), t3 !== undefined) {
        for (let e8 = 0;e8 < h.afterHandle.length; e8++) {
          let a4 = h.afterHandle[e8](i2, t3);
          a4 instanceof Promise && (a4 = await a4), a4 && (t3 = a4);
        }
        let e7 = mapEarlyResponse(t3, i2.set);
        if (e7)
          return e7;
      }
    }
    let g = u2(i2);
    if (g instanceof Promise && (g = await g), h.afterHandle.length)
      for (let e6 = 0;e6 < h.afterHandle.length; e6++) {
        let a4 = h.afterHandle[e6](i2, g);
        a4 instanceof Promise && (a4 = await a4);
        let s3 = mapEarlyResponse(a4, i2.set);
        if (s3 !== undefined) {
          let e7 = p?.response?.[g.status];
          if (e7?.Check(s3) === false)
            throw new ValidationError("response", e7, s3);
          return s3;
        }
      }
    else {
      let e6 = p?.response?.[g.status];
      if (e6?.Check(g) === false)
        throw new ValidationError("response", e6, g);
    }
    return mapResponse(g, i2.set);
  } catch (e6) {
    return e6.status && (l2.status = e6.status), a3.handleError(o2, e6, l2);
  } finally {
    for (let e6 of a3.event.onResponse)
      await e6(i2);
  }
};
var createDynamicErrorHandler = (e6) => async (t3, r4, n2 = { headers: {} }) => {
  for (let o2 = 0;o2 < e6.event.error.length; o2++) {
    let i2 = e6.event.error[o2]({ request: t3, code: r4.code ?? r4[ERROR_CODE] ?? "UNKNOWN", error: r4, set: n2 });
    if (i2 instanceof Promise && (i2 = await i2), i2 != null)
      return mapResponse(i2, n2);
  }
  return new Response(typeof r4.cause == "string" ? r4.cause : r4.message, { headers: n2.headers, status: r4.status ?? 500 });
};
// node_modules/elysia/dist/custom-types.js
var typebox2 = __toESM(require_typebox(), 1);
var system = __toESM(require_system2(), 1);
try {
  system.TypeSystem.Format("email", (e7) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(e7)), system.TypeSystem.Format("uuid", (e7) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e7)), system.TypeSystem.Format("date", (e7) => !Number.isNaN(new Date(e7).getTime())), system.TypeSystem.Format("date-time", (e7) => !Number.isNaN(new Date(e7).getTime()));
} catch (e7) {
}
var i2 = (e7) => {
  if (typeof e7 == "string")
    switch (e7.slice(-1)) {
      case "k":
        return 1024 * +e7.slice(0, e7.length - 1);
      case "m":
        return 1048576 * +e7.slice(0, e7.length - 1);
      default:
        return +e7;
    }
  return e7;
};
var r4 = (e7, t4) => {
  if (!(t4 instanceof Blob) || e7.minSize && t4.size < i2(e7.minSize) || e7.maxSize && t4.size > i2(e7.maxSize))
    return false;
  if (e7.extension) {
    if (typeof e7.extension == "string") {
      if (!t4.type.startsWith(e7.extension))
        return false;
    } else {
      for (let i3 = 0;i3 < e7.extension.length; i3++)
        if (t4.type.startsWith(e7.extension[i3]))
          return true;
      return false;
    }
  }
  return true;
};
var ElysiaType = { Numeric: system.TypeSystem.Type("Numeric", {}), File: system.TypeSystem.Type("File", r4), Files: system.TypeSystem.Type("Files", (e7, t4) => {
  if (!Array.isArray(t4))
    return r4(e7, t4);
  if (e7.minItems && t4.length < e7.minItems || e7.maxItems && t4.length > e7.maxItems)
    return false;
  for (let i3 = 0;i3 < t4.length; i3++)
    if (!r4(e7, t4[i3]))
      return false;
  return true;
}) };
typebox2.Type.Numeric = (t4) => typebox2.Type.Number({ ...t4, elysiaMeta: "Numeric" }), typebox2.Type.URLEncoded = (t4, i3) => typebox2.Type.Object(t4, { ...i3, elysiaMeta: "URLEncoded" }), typebox2.Type.File = (e7) => ElysiaType.File({ elysiaMeta: "File", default: "File", ...e7, extension: e7?.type, type: "string", format: "binary" }), typebox2.Type.Files = (e7) => ElysiaType.Files({ ...e7, elysiaMeta: "Files", default: "Files", extension: e7?.type, type: "array", items: { ...e7, default: "Files", type: "string", format: "binary" } });

// node_modules/elysia/dist/index.js
class v {
  config;
  dependencies = {};
  store = {};
  meta = { schema: Object.create(null), defs: Object.create(null), exposed: Object.create(null) };
  decorators = {};
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], onResponse: [], error: [], stop: [] };
  server = null;
  $schema = null;
  error = {};
  router = new Memoirist;
  routes = [];
  staticRouter = { handlers: [], variables: "", map: {}, all: "" };
  wsRouter;
  dynamicRouter = new Memoirist;
  lazyLoadModules = [];
  path = "";
  constructor(e7) {
    this.config = { forceErrorEncapsulation: false, prefix: "", aot: true, strictPath: false, scoped: false, ...e7, seed: e7?.seed === undefined ? "" : e7?.seed };
  }
  add(e7, o2, i3, n2, { allowMeta: a3 = false, skipPrefix: h = false } = { allowMeta: false, skipPrefix: false }) {
    o2 = o2 === "" ? o2 : o2.charCodeAt(0) === 47 ? o2 : `/${o2}`, this.config.prefix && !h && (o2 = this.config.prefix + o2);
    let d2 = this.meta.defs;
    if (n2?.type)
      switch (n2.type) {
        case "text":
          n2.type = "text/plain";
          break;
        case "json":
          n2.type = "application/json";
          break;
        case "formdata":
          n2.type = "multipart/form-data";
          break;
        case "urlencoded":
          n2.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          n2.type = "application/octet-stream";
      }
    let u2 = { body: getSchemaValidator(n2?.body ?? this.$schema?.body, { dynamic: !this.config.aot, models: d2 }), headers: getSchemaValidator(n2?.headers ?? this.$schema?.headers, { dynamic: !this.config.aot, models: d2, additionalProperties: true }), params: getSchemaValidator(n2?.params ?? this.$schema?.params, { dynamic: !this.config.aot, models: d2 }), query: getSchemaValidator(n2?.query ?? this.$schema?.query, { dynamic: !this.config.aot, models: d2 }), response: getResponseSchemaValidator(n2?.response ?? this.$schema?.response, { dynamic: !this.config.aot, models: d2 }) }, l2 = mergeHook(this.event, n2), p = o2.endsWith("/") ? o2.slice(0, o2.length - 1) : o2 + "/";
    if (this.config.aot === false) {
      this.dynamicRouter.add(e7, o2, { validator: u2, hooks: l2, content: n2?.type, handle: i3 }), this.config.strictPath === false && this.dynamicRouter.add(e7, p, { validator: u2, hooks: l2, content: n2?.type, handle: i3 }), this.routes.push({ method: e7, path: o2, composed: null, handler: i3, hooks: l2 });
      return;
    }
    let f2 = composeHandler({ path: o2, method: e7, hooks: l2, validator: u2, handler: i3, handleError: this.handleError, meta: a3 ? this.meta : undefined, onRequest: this.event.request, config: this.config });
    if (this.routes.push({ method: e7, path: o2, composed: f2, handler: i3, hooks: l2 }), o2.indexOf(":") === -1 && o2.indexOf("*") === -1) {
      let t4 = this.staticRouter.handlers.length;
      this.staticRouter.handlers.push(f2), this.staticRouter.variables += `const st${t4} = staticRouter.handlers[${t4}]
`, this.staticRouter.map[o2] || (this.staticRouter.map[o2] = { code: "" }), e7 === "ALL" ? this.staticRouter.map[o2].all = `default: return st${t4}(ctx)
` : this.staticRouter.map[o2].code += `case '${e7}': return st${t4}(ctx)
`, this.config.strictPath || (this.staticRouter.map[p] || (this.staticRouter.map[p] = { code: "" }), e7 === "ALL" ? this.staticRouter.map[p].all = `default: return st${t4}(ctx)
` : this.staticRouter.map[p].code += `case '${e7}': return st${t4}(ctx)
`);
    } else
      this.router.add(e7, o2, f2), this.config.strictPath || this.router.add(e7, o2.endsWith("/") ? o2.slice(0, o2.length - 1) : o2 + "/", f2);
  }
  onStart(e7) {
    return this.on("start", e7), this;
  }
  onRequest(e7) {
    return this.on("request", e7), this;
  }
  onParse(e7) {
    return this.on("parse", e7), this;
  }
  onTransform(e7) {
    return this.on("transform", e7), this;
  }
  onBeforeHandle(e7) {
    return this.on("beforeHandle", e7), this;
  }
  onAfterHandle(e7) {
    return this.on("afterHandle", e7), this;
  }
  onResponse(e7) {
    return this.on("response", e7), this;
  }
  addError(e7, t4) {
    if (typeof e7 == "string" && t4)
      return t4.prototype[ERROR_CODE] = e7, this;
    for (let [t5, r5] of Object.entries(e7))
      r5.prototype[ERROR_CODE] = t5;
    return this;
  }
  onError(e7) {
    return this.on("error", e7), this;
  }
  onStop(e7) {
    return this.on("stop", e7), this;
  }
  on(e7, t4) {
    switch (t4 = asGlobal(t4), e7) {
      case "start":
        this.event.start.push(t4);
        break;
      case "request":
        this.event.request.push(t4);
        break;
      case "response":
        this.event.onResponse.push(t4);
        break;
      case "parse":
        this.event.parse.splice(this.event.parse.length - 1, 0, t4);
        break;
      case "transform":
        this.event.transform.push(t4);
        break;
      case "beforeHandle":
        this.event.beforeHandle.push(t4);
        break;
      case "afterHandle":
        this.event.afterHandle.push(t4);
        break;
      case "error":
        this.event.error.push(t4);
        break;
      case "stop":
        this.event.stop.push(t4);
    }
    return this;
  }
  group(e7, r5, s3) {
    let i3 = new v({ ...this.config, prefix: "" });
    i3.store = this.store, this.wsRouter && i3.use(ws());
    let n2 = typeof r5 == "object", a3 = (n2 ? s3 : r5)(i3);
    return this.decorators = mergeDeep(this.decorators, i3.decorators), a3.event.request.length && (this.event.request = [...this.event.request, ...a3.event.request]), a3.event.onResponse.length && (this.event.onResponse = [...this.event.onResponse, ...a3.event.onResponse]), this.model(a3.meta.defs), Object.values(i3.routes).forEach(({ method: s4, path: o2, handler: h, hooks: d2 }) => {
      if (o2 = this.config.prefix + e7 + o2, n2) {
        let e8 = i3.wsRouter?.find("subscribe", o2);
        if (e8) {
          let e9 = i3.wsRouter.history.find(([e10, t4]) => o2 === t4);
          if (!e9)
            return;
          return this.ws(o2, e9[2]);
        }
        this.add(s4, o2, h, mergeHook(r5, { ...d2, error: d2.error ? Array.isArray(d2.error) ? [...d2.error, ...a3.event.error] : [d2.error, ...a3.event.error] : a3.event.error }));
      } else {
        let e8 = i3.wsRouter?.find("subscribe", o2);
        if (e8) {
          let e9 = i3.wsRouter.history.find(([e10, t4]) => o2 === t4);
          if (!e9)
            return;
          return this.ws(o2, e9[2]);
        }
        this.add(s4, o2, h, mergeHook(d2, { error: a3.event.error }), { skipPrefix: true });
      }
    }), i3.wsRouter && this.wsRouter && i3.wsRouter.history.forEach(([t4, r6, s4]) => {
      (r6 = this.config.prefix + e7 + r6) === "/" ? this.wsRouter?.add(t4, e7, s4) : this.wsRouter?.add(t4, `${e7}${r6}`, s4);
    }), this;
  }
  guard(e7, r5) {
    if (!r5)
      return this.event = mergeLifeCycle(this.event, e7), this.$schema = { body: e7.body, headers: e7.headers, params: e7.params, query: e7.query, response: e7.response }, this;
    let s3 = new v;
    s3.store = this.store, this.wsRouter && s3.use(ws());
    let i3 = r5(s3);
    return this.decorators = mergeDeep(this.decorators, s3.decorators), i3.event.request.length && (this.event.request = [...this.event.request, ...i3.event.request]), i3.event.onResponse.length && (this.event.onResponse = [...this.event.onResponse, ...i3.event.onResponse]), this.model(i3.meta.defs), Object.values(s3.routes).forEach(({ method: r6, path: o2, handler: n2, hooks: a3 }) => {
      let h = s3.wsRouter?.find("subscribe", o2);
      if (h) {
        let e8 = s3.wsRouter.history.find(([e9, t4]) => o2 === t4);
        if (!e8)
          return;
        return this.ws(o2, e8[2]);
      }
      this.add(r6, o2, n2, mergeHook(e7, { ...a3, error: a3.error ? Array.isArray(a3.error) ? [...a3.error, ...i3.event.error] : [a3.error, ...i3.event.error] : i3.event.error }));
    }), s3.wsRouter && this.wsRouter && s3.wsRouter.history.forEach(([e8, t4, r6]) => {
      this.wsRouter?.add(e8, t4, r6);
    }), this;
  }
  use(e7) {
    let r5 = (e8) => {
      if (typeof e8 == "function") {
        let t4 = e8(this);
        return t4 instanceof Promise ? (this.lazyLoadModules.push(t4.then((e9) => e9.compile())), this) : t4;
      }
      let r6 = e8.config.scoped;
      r6 || (this.decorators = mergeDeep(this.decorators, e8.decorators), this.state(e8.store), this.model(e8.meta.defs), this.addError(e8.error));
      let { config: { name: s3, seed: h } } = e8;
      if (Object.values(e8.routes).forEach(({ method: r7, path: s4, handler: o2, hooks: i3 }) => {
        let n2 = e8.wsRouter?.find("subscribe", s4);
        if (n2) {
          let t4 = e8.wsRouter.history.find(([e9, t5]) => s4 === t5);
          if (!t4)
            return;
          return this.ws(s4, t4[2]);
        }
        this.add(r7, s4, o2, mergeHook(i3, { error: e8.event.error }));
      }), !r6) {
        if (s3) {
          (s3 in this.dependencies) || (this.dependencies[s3] = []);
          let t4 = h !== undefined ? checksum(s3 + JSON.stringify(h)) : 0;
          if (this.dependencies[s3].some((e9) => t4 === e9))
            return this;
          this.dependencies[s3].push(t4), this.event = mergeLifeCycle(this.event, filterGlobalHook(e8.event), t4);
        } else
          this.event = mergeLifeCycle(this.event, filterGlobalHook(e8.event));
      }
      return this;
    };
    return e7 instanceof Promise ? (this.lazyLoadModules.push(e7.then((e8) => typeof e8 == "function" ? e8(this) : typeof e8.default == "function" ? e8.default(this) : r5(e8.default)).then((e8) => e8.compile())), this) : r5(e7);
  }
  mount(e7, t4) {
    if (typeof e7 == "function" || e7.length === 0 || e7 === "/") {
      let r6 = typeof e7 == "function" ? e7 : t4, s4 = async ({ request: e8, path: t5 }) => r6(new Request("http://a.cc" + t5, e8));
      return this.all("/", s4, { type: "none" }), this.all("/*", s4, { type: "none" }), this;
    }
    let r5 = e7.length, s3 = async ({ request: e8, path: s4 }) => t4(new Request("http://a.cc" + s4.slice(r5), e8));
    return this.all(e7, s3, { type: "none" }), this.all(e7 + (e7.endsWith("/") ? "*" : "/*"), s3, { type: "none" }), this;
  }
  get(e7, t4, r5) {
    return this.add("GET", e7, t4, r5), this;
  }
  post(e7, t4, r5) {
    return this.add("POST", e7, t4, r5), this;
  }
  put(e7, t4, r5) {
    return this.add("PUT", e7, t4, r5), this;
  }
  patch(e7, t4, r5) {
    return this.add("PATCH", e7, t4, r5), this;
  }
  delete(e7, t4, r5) {
    return this.add("DELETE", e7, t4, r5), this;
  }
  options(e7, t4, r5) {
    return this.add("OPTIONS", e7, t4, r5), this;
  }
  all(e7, t4, r5) {
    return this.add("ALL", e7, t4, r5), this;
  }
  head(e7, t4, r5) {
    return this.add("HEAD", e7, t4, r5), this;
  }
  trace(e7, t4, r5) {
    return this.add("TRACE", e7, t4, r5), this;
  }
  connect(e7, t4, r5) {
    return this.add("CONNECT", e7, t4, r5), this;
  }
  ws(e7, t4) {
    if (!this.wsRouter)
      throw Error("Can't find WebSocket. Please register WebSocket plugin first by importing 'elysia/ws'");
    return this.wsRouter.add("subscribe", e7, t4), this.get(e7, (e8) => {
      if (!this.server?.upgrade(e8.request, { headers: typeof t4.upgrade == "function" ? t4.upgrade(e8) : t4.upgrade, data: { ...e8, id: Date.now(), headers: e8.request.headers.toJSON(), message: getSchemaValidator(t4?.body, { models: this.meta.defs }), transformMessage: t4.transform ? Array.isArray(t4.transformMessage) ? t4.transformMessage : [t4.transformMessage] : [] } }))
        return e8.set.status = 400, "Expected a websocket connection";
    }, { beforeHandle: t4.beforeHandle, transform: t4.transform, headers: t4?.headers, params: t4?.params, query: t4?.query }), this;
  }
  route(e7, t4, r5, { config: s3, ...o2 } = { config: { allowMeta: false } }) {
    return this.add(e7, t4, r5, o2, s3), this;
  }
  state(e7, t4) {
    return typeof e7 == "object" ? this.store = mergeDeep(this.store, e7) : (e7 in this.store) || (this.store[e7] = t4), this;
  }
  decorate(e7, t4) {
    return typeof e7 == "object" ? this.decorators = mergeDeep(this.decorators, e7) : (e7 in this.decorators) || (this.decorators[e7] = t4), this;
  }
  derive(e7) {
    return e7.$elysia = "derive", this.onTransform(e7);
  }
  schema(e7) {
    let t4 = this.meta.defs;
    return this.$schema = { body: getSchemaValidator(e7.body, { models: t4 }), headers: getSchemaValidator(e7?.headers, { models: t4, additionalProperties: true }), params: getSchemaValidator(e7?.params, { models: t4 }), query: getSchemaValidator(e7?.query, { models: t4 }), response: getSchemaValidator(e7?.response, { models: t4 }) }, this;
  }
  compile() {
    return this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this), typeof this.server?.reload == "function" && this.server.reload({ ...this.server, fetch: this.fetch }), this;
  }
  handle = async (e7) => this.fetch(e7);
  fetch = (e7) => (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(e7);
  handleError = async (e7, t4, r5) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(e7, t4, r5);
  outerErrorHandler = (e7) => new Response(e7.message, { status: e7?.status ?? 500 });
  listen = (e7, t4) => {
    if (!Bun)
      throw Error("Bun to run");
    if (this.compile(), typeof e7 == "string" && Number.isNaN(e7 = +e7.trim()))
      throw Error("Port must be a numeric value");
    let r5 = this.fetch, s3 = typeof e7 == "object" ? { development: !isProduction, ...this.config.serve, ...e7, fetch: r5, error: this.outerErrorHandler } : { development: !isProduction, ...this.config.serve, port: e7, fetch: r5, error: this.outerErrorHandler };
    if (typeof Bun == "undefined")
      throw Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    this.server = Bun?.serve(s3);
    for (let e8 = 0;e8 < this.event.start.length; e8++)
      this.event.start[e8](this);
    return t4 && t4(this.server), Promise.all(this.lazyLoadModules).then(() => {
      Bun?.gc(true);
    }), this;
  };
  stop = async () => {
    if (!this.server)
      throw Error("Elysia isn't running. Call `app.listen` to start the server.");
    this.server.stop();
    for (let e7 = 0;e7 < this.event.stop.length; e7++)
      await this.event.stop[e7](this);
  };
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
  model(e7, t4) {
    return typeof e7 == "object" ? Object.entries(e7).forEach(([e8, t5]) => {
      (e8 in this.meta.defs) || (this.meta.defs[e8] = t5);
    }) : this.meta.defs[e7] = t4, this;
  }
}

// src/index.ts
var app = new v().get("/", () => "Hello Elysia").listen(3000);
console.log(`\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
