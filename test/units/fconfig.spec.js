define([ 'require'
    , 'lodash'
    , 'angular'
    , 'angular-mocks'
    , '$App/fconfig'
    , 'mocks'
], function (require, _, angular) {
    var _ = require('lodash'),
        fConfig = require('$App/fconfig'),
        mocks = require('mocks');

    describe("fconfig test", function () {
        var parse, configInst;
        beforeEach(inject(function ($parse) {
            parse = $parse;
        }));

        it("config should be defined", function () {
            expect(fConfig).toBeDefined();
        });
        it("result should be undefined", function () {
            configInst = fConfig(parse);
            configInst.init(mocks.configTest.context);
            expect(configInst.config(mocks.configTest.expression.exp1)).not.toBeDefined();

        });
        it("getter should work", function () {
            expect(configInst.config(mocks.configTest.expression.exp)).toEqual(mocks.configTest.context.right);

        });


        it("should change a value", function () {
            configInst.configAdd(mocks.configTest.expression.exp, mocks.configTest.expression.changeExp);
            expect(configInst.config(mocks.configTest.expression.exp)).toEqual(mocks.configTest.expression.changeExp);

        });

        it("should add key,value", function () {
            configInst.configAdd(mocks.configTest.expression.addExp, mocks.configTest.expression.addValue);
            expect(configInst.config(mocks.configTest.expression.addExp)).toEqual(mocks.configTest.expression.addValue);
        });

        it("should response config", function () {
            expect(configInst.getAll()).toEqual(mocks.configTest.compareObj);
        });

        it("should remove value", function () {
            configInst.remove(mocks.configTest.expression.exp);
            expect(configInst.config(mocks.configTest.expression.exp)).not.toBeDefined();
        });
    });

});
